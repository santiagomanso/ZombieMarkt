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
  const { name, ean, sku, category, image } = req.body
  try {
    const existingProduct = await productModel.findOne({ ean: ean })
    if (existingProduct) {
      res.status(500).json({
        message: 'Product already exists',
        product: existingProduct,
      })
    } else {
      const newProduct = new productModel({
        name: name,
        sku: sku,
        ean: ean,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        image: image,
        category: category,
      })
      try {
        const savedProduct = await newProduct.save()
        console.log(savedProduct)
        res.status(201).json({
          msg: 'Product created successfully',
        })
      } catch (error) {
        res.status(500).json({
          msg: error,
        })
      }
    }
  } catch (error) {
    res.status(500).json({
      msg: error,
    })
  }
}
