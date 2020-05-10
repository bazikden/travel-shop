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
  console.log(req.body)
  const { writer, title, description, price, country, images } = req.body

  const product = new Product(req.body)
  product
    .populate('writer')
    .save()
    .then((product) => res.json({ success: true, product }))
    .catch(err => res.status(400).json({ success: false }))
})


// Get all Products
router.get('/getAllProducts', (req, res) => {
  Product.find()
    .populate('writer')
    .then(products => res.json({ success: true, products }))
    .catch(err => res.status(500).json({ err }))
})

router.post('/deleteImage', (req, res) => {
  console.log(req.body)
  fs.unlink(req.body.image,(err)=>{
    if(err) return  res.json({ success: false, err })
    res.json({ success: true })  
  })

})

module.exports = router