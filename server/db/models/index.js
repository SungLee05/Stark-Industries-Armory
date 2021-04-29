const User = require('./users')
const Product = require('./products')
const Order = require('./orders')
const OrderHistory = require('./orderhistory')

User.hasMany(Order)
Order.belongsTo(User)
Order.belongsToMany(Product, {through: OrderHistory})
Product.belongsToMany(Order, {through: OrderHistory})

module.exports = {
  User,
  Order,
  Product,
  OrderHistory
}
