const express = require('express')
const router = express.Router()
const Food = require('../models/foodModel')
const multer = require('multer')
const path = require('path')

// Image upload setup
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage })

// Add food
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body
    const food = new Food({
      name,
      description,
      price,
      category,
      image: req.file.filename
    })
    await food.save()
    res.json({ success: true, message: 'Food added!' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
})

// Get all food
router.get('/list', async (req, res) => {
  try {
    const foods = await Food.find()
    res.json({ success: true, data: foods })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
})

// Delete food
router.delete('/remove/:id', async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Food removed!' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
})

module.exports = router