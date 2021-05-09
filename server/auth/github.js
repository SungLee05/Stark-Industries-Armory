const passport = require('passport')
const router = require('express').Router()
const GitHubStrategy = require('passport-github2').Strategy
const User = require('../db/models/users')
module.exports = router

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  console.log('GitHub client id / secret not found. Skipping GitHub OAuth')
} else {
  const githubConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK,
    scope: ['user:email']
  }
  const strategy = new GitHubStrategy(
    githubConfig,
    (accessToken, refreshToken, profile, cb) => {
      const githubId = profile.id
      const email = profile.emails[0].value
      User.findOrCreate({
        where: {
          githubId
        },
        defaults: {email}
      })
        .then(([user]) => cb(null, user))
        .catch(cb)
    }
  )

  passport.use(strategy)
  router.get('/', passport.authenticate('github', {scope: ['user:email']}))
  router.get(
    '/callback',
    passport.authenticate('github', {
      successRedirect: '/profile',
      failureRedirect: '/login'
    })
  )
}
