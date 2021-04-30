const faker = require('faker')
const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  function generateUsers() {
    let users = []
    for (let id = 1; id <= 10; id++) {
      users.push(
        User.create({
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: '123',
          admin: false
        })
      )
    }
    return users
  }
  const users = await Promise.all(generateUsers())

  function generateProducts() {
    let products = []
    for (let id = 1; id <= 10; id++) {
      products.push(
        Product.create({
          name: faker.name.findName(),
          price: 10.99,
          description: faker.lorem.sentences(),
          imageUrl: faker.image.imageUrl(),
          quantity: 1
        })
      )
    }
    return products
  }
  const products = await Promise.all(generateProducts())

  function generateOrders() {
    let orders = []
    for (let id = 0; id <= users.length; id++) {
      orders.push(
        Order.create({
          processed: false,
          userId: id + 1
        })
      )
    }
    return orders
  }
  const orders = await Promise.all(generateOrders())

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
