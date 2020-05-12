const router = require('express').Router()
const auth = require('../middleware/auth')
const Product = require('../models/Product')
const upload = require('../middleware/storage')
const fs = require('fs')


router.post('/uploadImage', auth, (req, res) => {
  upload(req, res, err => {
    if (err) return res.json({ success: false, err })
    return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
  })
})

// Add new Product
router.post('/uploadProduct', auth, (req, res) => {
  const { writer, title, description, price, continent, images } = req.body
  console.log(req.body)
  const product = new Product(req.body)
  product
    .populate('writer')
    .save()
    .then((product) => res.json({ success: true, product }))
    .catch(err => res.status(400).json({ success: false }))
})


// Get all Products
router.post('/getAllProducts', (req, res) => {
  const order = req.body.order ? req.body.order : "desc"
  const sortBy = req.body.sortBy ? req.body.sortBy : null
  const limit = req.body.limit ? parseInt(req.body.limit) : 100
  const skip = parseInt(req.body.skip)
  const searchValue = req.body.searchValue

  const filter = {}

  req.body.filter.continent.length > 0 && (filter.continent = req.body.filter.continent)
  if (req.body.filter.price.length === 1) { filter.price = { $gte: Number(req.body.filter.price[0]) } }
  if (req.body.filter.price.length === 2) { filter.price = { $gte: Number(req.body.filter.price[0]), $lte: Number(req.body.filter.price[1]) } }
  if (searchValue) {
    Product.find(filter)
      .find({ $text: { $search: searchValue } })
      .populate('writer')
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .then(products => res.json({ success: true, products }))
      .catch(err => res.status(500).json({ err }))
  } else {
    Product.find(filter)
      .populate('writer')
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .then(products => res.json({ success: true, products }))
      .catch(err => res.status(500).json({ err }))
  }

})

router.post('/deleteImage', (req, res) => {
  fs.unlink(req.body.image, (err) => {
    if (err) return res.json({ success: false, err })
    res.json({ success: true })
  })

})

module.exports = router