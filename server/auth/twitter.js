const passport = require('passport')
const router = require('express').Router()
const TwitterStrategy = require('passport-twitter').Strategy
const User = require('../db/models/users')
module.exports = router

if (!process.env.TWITTER_CONSUMER_KEY || !process.env.TWITTER_CONSUMER_SECRET) {
  console.log('Twitter consumer key / secret not found. Skipping Twitter OAuth')
} else {
  const tiwtterConfig = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK,
    profileFields: ['emails']
  }
  const strategy = new TwitterStrategy(
    tiwtterConfig,
    (token, tokenSecret, profile, cb) => {
      const twitterId = profile.id
      const email = profile.emails[0].value
      User.findOrCreate({
        where: {
          twitterId
        },
        defaults: {email}
      })
        .then(([user]) => cb(null, user))
        .catch(cb)
    }
  )

  passport.use(strategy)
  router.get('/', passport.authenticate('twitter'))
  router.get(
    '/callback',
    passport.authenticate('twitter', {
      successRedirect: '/profile',
      failureRedirect: '/login'
    })
  )
}
