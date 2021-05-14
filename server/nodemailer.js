const nodemailer = require('nodemailer')
const router = require('express').Router()

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const {email, cart, total} = req.body
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'starkindustriesarmory@gmail.com',
        pass: process.env.EMAIL_PW
      }
    })

    const message = {
      from: 'starkinduestriesarmory@gmail.com',
      to: email,
      subject: 'Order Receipt. Thank you for choosing Stark Industries Armory',
      html: `
        <h1>Stark Industries Armory Receipt</h1>
        ${cart
          .map(item => {
            return `
            <img src=${item.imageUrl} alt='item-photo' />
            <p>${item.name}</p>
            <p>${item.quantity} x $${item.price}</p>
            `
          })
          .join('')}
          <hr />
        <h4>Total: $${total}</h4>
        <a href='https://starkindustriesarmory.herokuapp.com'>Shop Again</a>
      `
    }

    await transport.sendMail(message, (err, info) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Successfully sent e-mail receipt')
      }
    })
  } catch (err) {
    next(err)
  }
})
