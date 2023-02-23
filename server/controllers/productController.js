import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'

//NOTE GET ALL
export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel
      .find({})
      .populate({ path: 'category' })
      .exec()
    res.status(200).json({
      amountOfItems: allProducts.length,
      allProducts,
    })
  } catch (error) {
    res.status(500).json({
      error: error,
      message: 'Uncatched error',
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
  } catch (error) {}
}

//NOTE GET BY NAME
export const getProductsByName = async (req, res) => {
  const { name } = req.params
  try {
    const products = await productModel.find({ name: { $regex: name } })
    res.status(200).json(products)
  } catch (error) {
    console.log(error)
  }
}

//NOTE GET BY ID
export const getProductById = async (req, res) => {
  const { _id } = req.params
  if (!_id) {
    res.status(404).json({
      error: 'Product not found',
    })
    return
  } else {
    try {
      const product = await productModel.findById(_id)
      res.status(200).json({
        product: product,
      })
    } catch (error) {
      res.status(500).json({
        message: 'Product not found',
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
    console.log(error)
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
    price,
    image,
    shelf,
    backstock,
  } = req.body

  if (!name || !ean || !sku || !category || !countInStock || !price) {
    return res.status(500).json({
      message: 'error empty field/s detected',
    })
  }

  // let imageUrl
  // if (req.file) {
  //   imageUrl = await cloudinary.uploader.upload(req.file.path, {
  //     folder: 'productImages',
  //   })
  // }
  // if (imageUrl) imageUrl = imageUrl.url
  // console.log('imageUrl', imageUrl)
  console.log('req.body', req.body)

  try {
    const existingProduct = await productModel.findOne({ ean: ean })
    if (existingProduct) {
      console.log('error product already exists')
      res.status(501).json({ message: 'error: product already exists' })
    } else {
      const newProduct = new productModel({
        name: name,
        sku: sku,
        ean: ean,
        countInStock: countInStock,
        price: price,
        image: image,
        category: category,
        shelf: shelf,
        backstock: backstock,
      })
      // console.log('newProduct', newProduct)
      try {
        const savedProduct = await newProduct.save()
        // console.log(savedProduct)
        res.status(201).json({
          msg: 'Product created successfully',
          product: savedProduct,
        })
      } catch (error) {
        console.log('error server')
        // console.log(error)
        res.status(503).json({
          msg: error,
        })
      }
    }
  } catch (error) {
    console.log('error undefined')
    res.status().json({
      message: error,
    })
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
    let product = await productModel.findById(_id)
    if (product) {
      //update product
      product = await productModel.findByIdAndUpdate(
        { _id: _id },
        { $set: newProduct },
        { new: true },
      )
      res.status(200).json({
        product: product,
      })
    } else {
      res.status(404).json({
        msg: 'Product not found',
      })
    }
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
