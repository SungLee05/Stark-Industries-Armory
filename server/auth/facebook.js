const passport = require('passport')
const router = require('express').Router()
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../db/models/users')
module.exports = router

if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {
  console.log('Facebook app ID / secret not found. Skipping Facebook OAuth ')
} else {
  const facebookConfig = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK
  }
  const strategy = new FacebookStrategy(
    facebookConfig,
    (accessToken, refreshToken, profile, done) => {
      const facebookId = profile.id
      const email = profile.emails[0].value
      const imgUrl = profile.photos[0].value
      const firstName = profile.name.givenName
      const lastName = profile.name.familyName
      const fullName = profile.displayName

      User.findOrCreate({
        where: {facebookId},
        defaults: {email, imgUrl, firstName, lastName, fullName}
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get(
    '/',
    passport.authenticate('facebook', {scope: ['email', 'profile']})
  )

  router.get(
    '/callback',
    passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/login'
    })
  )
}
