import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'

//NOTE GET ALL
export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .find({})
      .populate({ path: 'category' })
      .populate({ path: 'comments.user', select: 'email' })
      .populate({ path: 'favorites', select: 'email' })
      .exec()
    res.status(200).json({
      amountOfItems: products.length,
      products,
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Uncatched error',
    })
  }
}

//NOTE GET by category
export const getProductsByCategory = async (req, res) => {
  // console.log('req.params', req.params)

  try {
    const products = await productModel
      .find({
        categoryName: req.params.category,
      })
      .populate({ path: 'category' })
      .exec()
    res.status(200).json({
      products,
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Fatal error',
    })
  }
}

//NOTE GET BY NAME
export const getProductsByName = async (req, res) => {
  const { name } = req.params
  try {
    const products = await productModel.find({ name: { $regex: name } })
    res.status(200).json(products)
  } catch (error) {
    res.status(400).json({
      msg: 'Fatal error',
    })
  }
}

//NOTE GET BY ID
export const getProductById = async (req, res) => {
  const { _id } = req.params
  if (!_id) {
    res.status(404).json({
      msg: 'Product not found',
    })
    return
  } else {
    try {
      const product = await productModel
        .findById(_id)
        .populate({ path: 'comments.user', select: 'email image' })
        .populate({ path: 'favorites', select: 'email' })
      res.status(200).json({
        product: product,
      })
    } catch (error) {
      res.status(500).json({
        msg: 'Product not found',
      })
    }
  }
}

//NOTE GET BY EAN
export const getProductsByEAN = async (req, res) => {
  const { ean } = req.params
  console.log('EAN: ', ean)
  try {
    const products = await productModel.find({ ean: ean })
    res.status(200).json(products)
  } catch (error) {
    res.staus(500).json({
      msg: 'Fatal error',
    })
  }
}

//NOTE POST NEW PRODUCT
export const postNewProduct = async (req, res) => {
  const {
    name,
    ean,
    sku,
    category,
    countInStock,
    categoryName,
    price,
    image,
    shelf,
    backstock,
  } = req.body

  // console.log(req.body)

  if (!name || !ean || !sku || !category || !countInStock || !price) {
    res.status(400).json({
      msg: 'error empty field/s detected',
      fields: {
        name: name,
        ean: ean,
        sku: sku,
        category: category,
        countInStock: countInStock,
        price: price,
      },
    })
    return
  }

  // let imageUrl
  // if (req.file) {
  //   imageUrl = await cloudinary.uploader.upload(req.file.path, {
  //     folder: 'productImages',
  //   })
  // }
  // if (imageUrl) imageUrl = imageUrl.url
  // console.log('imageUrl', imageUrl)
  // console.log('req.body', req.body)

  try {
    // console.log('ean', ean)
    const existingProduct = await productModel.findOne({ ean: ean })
    // console.log('existingProduct->', existingProduct)
    if (existingProduct) {
      // console.log('error product already exists')
      res.status(501).json({ msg: 'error: product already exists' })
    } else {
      const newProduct = new productModel({
        name: name,
        sku: sku,
        ean: ean,
        countInStock: countInStock,
        price: price,
        image: image,
        categoryName: categoryName,
        category: category,
        shelf: shelf,
        backstock: backstock,
      })
      // console.log('newProduct', newProduct)
      try {
        const savedProduct = await newProduct.save()
        // console.log('savedProduct::::', savedProduct)
        res.status(201).json({
          msg: 'Product created successfully',
          product: savedProduct,
        })
      } catch (error) {
        console.log('error server', error)
        console.log(error)
        res.status(503).json({
          msg: 'Fatal error',
        })
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Fatal error',
    })
  }
}

//NOTE POST NEW COMMENT
export const postNewComment = async (req, res) => {
  const { comment } = req.body
  const { _id } = req.params

  console.log('req.user', req.user)
  console.log('comment', comment)
  console.log('product._id', _id)

  if (!comment) {
    res.status(400).json({
      msg: 'Invalid comment',
    })
    return
  }

  const product = await productModel.findById(_id)
  if (!product) {
    res.status(404).json({
      msg: 'product not found',
    })
    return
  }

  if (product.comments.length > 0) {
    console.log('product.comments', product.comments)
    //NOTE check if the user has already commented on the product
    const alreadyCommented = product.comments.some(
      (c) => c.user.toString() === req.user._id.toString(),
    )

    if (alreadyCommented) {
      console.log('alreadyCommented', alreadyCommented)
      res.status(400).json({
        msg: "can't comment twice",
      })
      return
    }
  }

  try {
    const commentsObj = {
      user: req.user._id,
      comment: comment,
    }

    await productModel.findByIdAndUpdate(
      product._id,
      { $push: { comments: commentsObj } },
      { new: true },
    )
    res.status(201).json({
      msg: 'Comment successfully added!',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Fatal error',
    })
  }
}

//NOTE DELETE COMMENT
export const deleteComment = async (req, res) => {
  try {
    const productId = req.params.id
    const userId = req.user._id
    const commentId = req.params.commentId

    // Find the product by ID
    const product = await Product.findById(productId)

    // Find the comment in the product's comments array
    const comment = product.comments.find(
      (c) => c._id.toString() === commentId && c.user.toString() === userId,
    )

    // If the comment doesn't exist or doesn't belong to the current user, return an error
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }

    // Remove the comment from the comments array and save the product
    product.comments = product.comments.filter(
      (c) => c._id.toString() !== commentId,
    )
    await product.save()

    res.json({ message: 'Comment deleted' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

//NOTE UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  const { _id } = req.params

  const {
    name,
    ean,
    sku,
    countInStock,
    rating,
    numReviews,
    category,
    shelf,
    backstock,
    price,
    image,
  } = req.body

  // // console.log('req.file', req.file)
  // let imageUrl
  // if (req.file) {
  //   //TODO search more adecuate way of dealing with undefined
  //   //NOTE OBJECTO COMO RESPUESTA>
  //   imageUrl = await cloudinary.uploader.upload(req.file.path, {
  //     folder: 'productImages',
  //   })
  // }
  // if (imageUrl) imageUrl = imageUrl.url
  // // console.log('imageUrl', imageUrl)

  const newProduct = {}
  if (name) newProduct.name = name
  if (ean) newProduct.ean = ean
  if (sku) newProduct.sku = sku
  if (countInStock) newProduct.countInStock = countInStock
  if (rating) newProduct.rating = rating
  if (numReviews) newProduct.numReviews = numReviews
  if (category) newProduct.category = category
  if (image) newProduct.image = image
  if (shelf) newProduct.shelf = shelf
  if (price) newProduct.price = price
  if (backstock) newProduct.backstock = backstock

  console.log('newProduct', newProduct)

  try {
    //try to get an existing product
    let product = await productModel.findById(_id)

    //validate if there is no product
    if (!product) {
      res.status(404).json({
        msg: 'product not found',
      })
      return
    }

    //update product
    product = await productModel.findByIdAndUpdate(
      { _id: _id },
      { $set: newProduct },
      { new: true },
    )

    res.status(200).json({
      product: product,
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Internal error',
    })
  }
}

//NOTE DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  const { _id } = req.params

  try {
    await productModel.deleteOne({ _id: _id })
    res.status(200).json({
      msg: 'Product was successfully deleted',
    })
  } catch (error) {
    res.status(401).json({
      msg: 'There was an error while trying to delete',
    })
  }
}
