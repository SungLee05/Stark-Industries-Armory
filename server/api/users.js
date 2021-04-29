const router = require('express').Router()
const User = require('../db/models/user')
const adminAuth = require('../auth/adminAuth')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'admin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const userId = req.params.id
  try {
    const user = await User.findByPk(userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  const userId = req.params.id
  try {
    const user = await User.findByPk(userId)
    if (!user) {
      res.sendStatus(404)
    } else {
      await user.update(req.body)
      res.json(user)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const userId = req.params.id
  try {
    await User.destroy({
      where: {
        id: userId
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
