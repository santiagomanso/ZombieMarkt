import productModel from '../models/productModel.js'

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find({})
    res.status(200).json({
      amountOfItems: allProducts.length,
      allProducts,
    })
  } catch (error) {
    res.status(500).json({
      error,
      message: 'There are no products',
    })
  }
}

export const getProductsByName = async (req, res) => {
  const { name } = req.params
  try {
    const products = await productModel.find({ name: { $regex: name } })
    res.status(200).json(products)
  } catch (error) {
    console.log(error)
  }
}

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

//NOTE 1nd step
export const postImage = async (req, res) => {
  res.json(req.file)
}

//NOTE POST NEW PRODUCT
export const postNewProduct = async (req, res) => {
  //destructure fields that are mandatory
  const { name, ean, sku, category, image, countInStock } = req.body
  if (!name && !ean && !sku && !category && !image && !countInStock) {
    return res.status(500).json({
      message: 'error empty field/s detected',
    })
  }
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
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        image: image,
        category: category,
      })
      try {
        const savedProduct = await newProduct.save()
        // console.log(savedProduct)
        res.status(201).json({
          msg: 'Product created successfully',
          product: savedProduct,
        })
      } catch (error) {
        console.log('error server')
        res.status(503).json({
          msg: 'error inner catch',
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

export const updateProduct = async (req, res) => {
  const { _id } = req.params

  const { name, ean, sku, countInStock, rating, numReviews, image, category } =
    req.body

  const newProduct = {}
  if (name) newProduct.name = name
  if (ean) newProduct.ean = ean
  if (sku) newProduct.sku = sku
  if (countInStock) newProduct.countInStock = countInStock
  if (rating) newProduct.rating = rating
  if (numReviews) newProduct.numReviews = numReviews
  if (image) newProduct.image = image
  if (category) newProduct.category = category

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
