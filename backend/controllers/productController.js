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
  try {
    const products = await productModel.find({ ean: ean })
    res.status(200).json(products)
  } catch (error) {
    console.log(error)
  }
}
