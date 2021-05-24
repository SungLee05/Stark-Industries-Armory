const faker = require('faker')
const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  function generateUsers() {
    let users = [
      User.create({
        name: 'user2',
        email: 'user2@email.com',
        password: '123123',
        admin: false
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
        fullName: 'MARK I',
        price: 999.0,
        description:
          'Iste repellat minima ratione magni ut quod itaque beatae. Molestias repellat in veritatis eum. Exercitationem doloremque et dolores quidem. Dolor quibusdam debitis minima sequi quam et est pariatur.',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk1-transparent.png?alt=media&token=b481a66d-72e6-4501-bd4b-59dd439e6c95',
        singleInfoImageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/MK1%20profile.png?alt=media&token=0f325bdd-1934-4b56-a0bd-f86af76eb814',
        quantity: 1
      }),
      Product.create({
        name: 'MK2',
        fullName: 'MARK II',
        price: 9999.0,
        description:
          'Iste repellat minima ratione magni ut quod itaque beatae. Molestias repellat in veritatis eum. Exercitationem doloremque et dolores quidem. Dolor quibusdam debitis minima sequi quam et est pariatur.',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk2-transparent.png?alt=media&token=a3ce7583-5571-4782-97d2-41eb2ea25f27',
        singleInfoImageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk2%20profile.png?alt=media&token=782bbd37-91a4-4ff5-8f24-998391495405',
        quantity: 1
      }),
      Product.create({
        name: 'MK3',
        fullName: 'MARK III',
        price: 9999.0,
        description:
          'Iste repellat minima ratione magni ut quod itaque beatae. Molestias repellat in veritatis eum. Exercitationem doloremque et dolores quidem. Dolor quibusdam debitis minima sequi quam et est pariatur.',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk3-transparent.png?alt=media&token=80022e98-9a60-455f-bcc9-2036a56d306b',
        singleInfoImageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk3%20profile.png?alt=media&token=74444aee-a0a4-47ce-8714-1f2eb23c5996',
        quantity: 1
      }),
      Product.create({
        name: 'MK5',
        fullName: 'MARK V',
        price: 9999.0,
        description:
          'Iste repellat minima ratione magni ut quod itaque beatae. Molestias repellat in veritatis eum. Exercitationem doloremque et dolores quidem. Dolor quibusdam debitis minima sequi quam et est pariatur.',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mark%20V.png?alt=media&token=7e2f3e5c-7f7d-4c0b-ad69-df5765a0cd14',
        singleInfoImageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mkV.png?alt=media&token=ca49e517-03c2-4956-8c32-f4629bfbf733',
        quantity: 1
      }),
      Product.create({
        name: 'MK42',
        fullName: 'MARK XLII',
        price: 10999.0,
        description:
          'Iste repellat minima ratione magni ut quod itaque beatae. Molestias repellat in veritatis eum. Exercitationem doloremque et dolores quidem. Dolor quibusdam debitis minima sequi quam et est pariatur.',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk42-transparent.png?alt=media&token=9f6ffe42-8267-4e94-b19d-4b84d932129c',
        singleInfoImageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk42new.jpg?alt=media&token=9bc9e930-0fde-4818-b85c-751c5cf61d03',
        quantity: 1
      }),
      Product.create({
        name: 'MK43',
        fullName: 'MARK XLIII',
        price: 10999.0,
        description:
          'Iste repellat minima ratione magni ut quod itaque beatae. Molestias repellat in veritatis eum. Exercitationem doloremque et dolores quidem. Dolor quibusdam debitis minima sequi quam et est pariatur.',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk43-transparent.png?alt=media&token=ccabc477-2369-4464-9d33-5e4ab7ab2116',
        singleInfoImageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/MK43.jpg?alt=media&token=823ad9b4-b8df-413b-baea-37d7d939e78d',
        quantity: 1
      }),
      Product.create({
        name: 'MK46',
        fullName: 'MARK XLVI',
        price: 10999.0,
        description:
          'Iste repellat minima ratione magni ut quod itaque beatae. Molestias repellat in veritatis eum. Exercitationem doloremque et dolores quidem. Dolor quibusdam debitis minima sequi quam et est pariatur.',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/MK46-transparent.png?alt=media&token=16e10954-93c6-488a-8dfb-2bf9fe7b00df',
        singleInfoImageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk46.jpg?alt=media&token=472194b0-3cbf-42fc-852e-bbda5b1789a3',
        quantity: 1
      }),
      Product.create({
        name: 'MK47',
        fullName: 'MARK XLVII',
        price: 50000.0,
        description:
          'Iste repellat minima ratione magni ut quod itaque beatae. Molestias repellat in veritatis eum. Exercitationem doloremque et dolores quidem. Dolor quibusdam debitis minima sequi quam et est pariatur.',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk47-transparent.png?alt=media&token=dc90caf9-4e6d-42bc-95f2-2c6c34400dea',
        singleInfoImageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk47.jpg?alt=media&token=a9d71242-0c01-4351-972b-f22e14cea850',
        quantity: 1
      }),
      Product.create({
        name: 'MK50',
        fullName: 'MARK L',
        price: 99000.0,
        description:
          'Iste repellat minima ratione magni ut quod itaque beatae. Molestias repellat in veritatis eum. Exercitationem doloremque et dolores quidem. Dolor quibusdam debitis minima sequi quam et est pariatur.',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/MK50-transparent.png?alt=media&token=388ce123-ab6b-408d-bc6b-1cd40939a758',
        singleInfoImageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk50newer.jpg?alt=media&token=cf7e99c2-50b1-4b9a-a112-babe043933b0',
        quantity: 1
      }),
      Product.create({
        name: 'MK85',
        fullName: 'MARK LXXXV',
        price: 100000.0,
        description:
          'Iste repellat minima ratione magni ut quod itaque beatae. Molestias repellat in veritatis eum. Exercitationem doloremque et dolores quidem. Dolor quibusdam debitis minima sequi quam et est pariatur.',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk85-transparent.png?alt=media&token=cc1fa3d4-7bd2-4aa2-845f-d4e4aedf81f2',
        singleInfoImageUrl:
          'https://firebasestorage.googleapis.com/v0/b/stark-industries-armory.appspot.com/o/mk85newer.jpg?alt=media&token=e6b42a6d-d618-457a-b3f9-277e3484e0d4',
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
