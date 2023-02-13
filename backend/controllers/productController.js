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

export const postNewProduct = async (req, res) => {
  //destructure fields that are mandatory
  const { name, ean, sku, category, image, countInStock } = req.body
  if (!name && !ean && !sku && !category && !image && !countInStock) {
    return res.status(500).json({
      message: 'error empty field/s detected',
    })
  }
  // console.log('name', name)
  // console.log('ean', ean)
  // console.log('sku', sku)
  // console.log('category', category)
  // console.log('image', image)
  // console.log('countInStock', countInStock)
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
