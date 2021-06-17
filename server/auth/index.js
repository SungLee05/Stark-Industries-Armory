const router = require('express').Router()
const User = require('../db/models/users')
const {body, validationResult} = require('express-validator')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Email does not exist.')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Incorrect password. Please try again.')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({min: 6}),
  async (req, res, next) => {
    const errors = validationResult(req)

    try {
      if (!errors.isEmpty() && errors.errors[0].param === 'email') {
        return res.status(400).send('Invalid email address. Please try again.')
      }
      if (!errors.isEmpty() && errors.errors[0].param === 'password') {
        return res
          .status(400)
          .send('Password must be longer than 6 characters. Please try again.')
      }
      const user = await User.create(req.body)
      req.login(user, err => (err ? next(err) : res.json(user)))
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists. Please try again.')
      } else {
        next(err)
      }
    }
  }
)

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
router.use('/facebook', require('./facebook'))
router.use('/github', require('./github'))
