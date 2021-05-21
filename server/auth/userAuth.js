const userAuth = (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res
      .status(401)
      .send('Admin Access Required: Not authorized to view this content')
  } else {
    next()
  }
}

module.exports = userAuth
