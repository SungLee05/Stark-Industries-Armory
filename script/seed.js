const faker = require('faker')
const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  function generateUsers() {
    let users = [
      User.create({
        name: 'admin',
        email: 'admin@email.com',
        password: '123123',
        admin: true
      }),
      User.create({
        name: 'user',
        email: 'user@email.com',
        password: '123123',
        admin: false
      })
    ]
    return users
  }
  const users = await Promise.all(generateUsers())

  function generateProducts() {
    let products = [
      Product.create({
        name: 'MK1',
        price: 999.0,
        description: faker.lorem.sentences(),
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk1-transparent.png?alt=media&token=b481a66d-72e6-4501-bd4b-59dd439e6c95',
        singsingleInfoImageUrl: '2ND URL',
        quantity: 1
      }),
      Product.create({
        name: 'MK2',
        price: 9999.0,
        description: faker.lorem.sentences(),
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk2-transparent.png?alt=media&token=a3ce7583-5571-4782-97d2-41eb2ea25f27',
        singsingleInfoImageUrl: '2ND URL',
        quantity: 1
      }),
      Product.create({
        name: 'MK3',
        price: 9999.0,
        description: faker.lorem.sentences(),
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk3-transparent.png?alt=media&token=80022e98-9a60-455f-bcc9-2036a56d306b',
        singsingleInfoImageUrl: '2ND URL',
        quantity: 1
      }),
      Product.create({
        name: 'MK5',
        price: 9999.0,
        description: faker.lorem.sentences(),
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk5-transparent.png?alt=media&token=8d07af47-0686-48a4-92ec-4b98a411aa3b',
        singsingleInfoImageUrl: '2ND URL',
        quantity: 1
      }),
      Product.create({
        name: 'MK42',
        price: 10999.0,
        description: faker.lorem.sentences(),
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk42-transparent.png?alt=media&token=9f6ffe42-8267-4e94-b19d-4b84d932129c',
        singsingleInfoImageUrl: '2ND URL',
        quantity: 1
      }),
      Product.create({
        name: 'MK43',
        price: 10999.0,
        description: faker.lorem.sentences(),
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk43-transparent.png?alt=media&token=ccabc477-2369-4464-9d33-5e4ab7ab2116',
        singsingleInfoImageUrl: '2ND URL',
        quantity: 1
      }),
      Product.create({
        name: 'MK46',
        price: 10999.0,
        description: faker.lorem.sentences(),
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/MK46-transparent.png?alt=media&token=16e10954-93c6-488a-8dfb-2bf9fe7b00df',
        singsingleInfoImageUrl: '2ND URL',
        quantity: 1
      }),
      Product.create({
        name: 'MK47',
        price: 50000.0,
        description: faker.lorem.sentences(),
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk47-transparent.png?alt=media&token=dc90caf9-4e6d-42bc-95f2-2c6c34400dea',
        singsingleInfoImageUrl: '2ND URL',
        quantity: 1
      }),
      Product.create({
        name: 'MK50',
        price: 99000.0,
        description: faker.lorem.sentences(),
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/MK50-transparent.png?alt=media&token=388ce123-ab6b-408d-bc6b-1cd40939a758',
        singleInfoImageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk50newer.jpg?alt=media&token=cf7e99c2-50b1-4b9a-a112-babe043933b0',
        quantity: 1
      }),
      Product.create({
        name: 'MK85',
        price: 100000.0,
        description: faker.lorem.sentences(),
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk85-transparent.png?alt=media&token=cc1fa3d4-7bd2-4aa2-845f-d4e4aedf81f2',
        singsingleInfoImageUrl: '2ND URL',
        quantity: 1
      })
    ]
    return products
  }
  const products = await Promise.all(generateProducts())

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
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
