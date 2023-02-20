import categoryModel from '../models/categoryModel.js'

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({})
    res.status(200).json({
      categories: categories,
    })
  } catch (error) {}
}
