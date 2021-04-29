const router = require('express').Router()
const {Order, Product, OrderHistory} = require('../db/models')

router.get('/cart', async (req, res, next) => {
  const userId = req.user.id
  try {
    const order = await Product.findAll({
      include: {
        model: Order,
        where: {
          userId: userId,
          processed: false
        }
      }
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.put('/cart/:action', async (req, res, next) => {
  const productId = req.body.productId
  const orderId = req.body.orderId
  try {
    const orderItem = await OrderHistory.findOne({
      where: {
        productId: productId,
        orderId: orderId
      }
    })
    if (req.params.action === 'increment') {
      await orderItem.increment('quantity')
    }
    if (req.params.action === 'decrement') {
      await orderItem.decrement('quantity')
    }
    res.json(orderItem)
  } catch (err) {
    next(err)
  }
})

router.post('/cart', async (req, res, next) => {
  const productId = req.body.productId
  const userId = req.user.id
  try {
    const currentProduct = await Product.findByPk(productId)
    const currentOrder = await Order.findOrCreate({
      where: {
        userId: userId,
        processed: false
      }
    })
    await currentOrder[0].addProduct(currentProduct)
    const newProduct = await Product.findByPk(productId, {
      include: {model: Order}
    })
    const orderItem = await OrderHistory.findOne({
      where: {
        productId: productId,
        orderId: currentOrder[0].id
      }
    })
    if (req.body.quantity) {
      const newQuantity = req.body.quantity + orderItem.quantity - 1
      await orderItem.update({quantity: newQuantity})
    }
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

router.delete('/cart/:productId', async (req, res, next) => {
  const productId = req.params.productId
  const userId = req.user.id
  try {
    const removedProduct = await Product.findByPk(productId)
    const currentOrder = await Order.findOne({
      where: {userId: userId, processed: false}
    })
    await currentOrder.removeProduct(removedProduct)
    res.sendStatus(204).end()
  } catch (err) {
    next(err)
  }
})

router.get('/orderHistory', async (req, res, next) => {
  const userId = req.user.id
  try {
    const orderHistory = await Order.findAll({
      where: {userId: userId, processed: true},
      include: {model: Product}
    })
    res.json(orderHistory)
  } catch (err) {
    next(err)
  }
})

router.put('/checkout', async (req, res, next) => {
  const userId = req.user.id
  try {
    const currentOrder = await Order.findOne({
      where: {userId: userId, processed: false}
    })
    await currentOrder.update({
      processed: true
    })
    res.json(currentOrder)
    const newOrder = await Order.create()
    await newOrder.setUser(userId)
  } catch (err) {
    next(err)
  }
})

module.exports = router
