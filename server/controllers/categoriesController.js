import categoryModel from '../models/categoryModel.js'

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({})
    res.status(200).json({
      categories: categories,
    })
  } catch (error) {}
}

export const getCategoryByName = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ name: req.params.name })
    // console.log('category', category)
    if (category) {
      res.status(200).json({
        category: category,
      })
    } else {
      res.status(404).json({
        msg: 'Category not found',
      })
    }
  } catch (error) {}
}
