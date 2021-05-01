const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const chalk = require('chalk')

const urlBase =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8080/'
    : 'https://stark-industries-armory.herokuapp.com/'

router.post('/create-session', async (req, res, next) => {
  console.log(chalk.bgMagenta('HERE'))

  try {
    const {cart, user} = req.body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart.map(item => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name
            },
            unit_amount: Number(item.price) * 100
          },
          quantity: item.orderHistory.quantity
        }
      }),
      mode: 'payment',
      success_url: urlBase + 'thank-you',
      cancel_url: urlBase + 'cart'
    })

    res.json({id: session.id})
  } catch (err) {
    next(err)
  }
})

router.post('/webhook', async (req, res, next) => {
  const sig = req.headers['stripe-signature']
  const endpointSecret = ''
  let event
  try {
    event = stripe.webhooks.constructEvent(
      req.body.rawBody,
      sig,
      endpointSecret
    )
  } catch (err) {
    next(err)
  }
})

router.post('/secret', async (req, res, next) => {
  const {total} = req.body
  try {
    const paymentIntent = await stripe.paymentIntents.creat({
      amount: total,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {integration_check: 'accept_a_payment'}
    })

    res.json(paymentIntent.client_secret)
  } catch (err) {
    next(err)
  }
})
