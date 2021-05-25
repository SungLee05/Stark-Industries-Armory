const router = require('express').Router()
const {Order, Product, OrderHistory} = require('../db/models')
const userAuth = require('../auth/userAuth')

router.get('/cart', userAuth, async (req, res, next) => {
  try {
    const order = await Product.findAll({
      include: {
        model: Order,
        where: {
          userId: req.user.id,
          processed: false
        }
      }
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.put('/cart/:action', userAuth, async (req, res, next) => {
  const productId = req.body.ProductId
  const orderId = req.body.OrderId
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
    if (req.params.action === 'decrement' && orderItem.quantity > 1) {
      await orderItem.decrement('quantity')
    }
    res.json(orderItem)
  } catch (err) {
    next(err)
  }
})

router.post('/cart', userAuth, async (req, res, next) => {
  const productId = req.body.Product.id
  const userId = req.body.userId
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

    if (req.body.Product.quantity > 0) {
      const newQuantity = orderItem.quantity + req.body.Product.quantity
      await orderItem.update({quantity: newQuantity})
    }
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

router.delete('/cart/:productId', userAuth, async (req, res, next) => {
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

router.get('/orderHistory', userAuth, async (req, res, next) => {
  const userId = req.user.id

  try {
    const orderHistory = await Order.findAll({
      where: {userId: userId, processed: true},
      order: [['id', 'DESC']],
      include: {model: Product}
    })
    res.json(orderHistory)
  } catch (err) {
    next(err)
  }
})

router.put('/checkout', userAuth, async (req, res, next) => {
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
