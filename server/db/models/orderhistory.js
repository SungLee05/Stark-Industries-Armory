const Sequelize = require('sequelize')
const db = require('../db')

const OrderHistory = db.define('orderHistory', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = OrderHistory
