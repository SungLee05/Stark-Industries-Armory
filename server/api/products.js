const router = require('express').Router()
const Product = require('../db/models/products')
const adminAuth = require('../auth/adminAuth')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  const productId = req.params.productId
  try {
    const product = await Product.findByPk(productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.post('/', adminAuth, async (req, res, next) => {
  try {
    const [product, created] = await Product.findOrCreate({
      where: {
        name: req.body.name
      },
      defaults: req.body
    })

    if (!created) return res.sendStatus(409)
    return res.status(201).json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/', adminAuth, async (req, res, next) => {
  const productId = req.body.productId
  try {
    const product = await Product.findByPk(productId)
    if (!product) {
      res.sendStatus(404)
    } else {
      await product.update(req.body)
      res.json(product)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', adminAuth, async (req, res, next) => {
  const productId = req.params.productId
  try {
    await Product.destroy({
      where: {
        id: productId
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
