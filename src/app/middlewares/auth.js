const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  if (req.session && req.session.token) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.session.token,
        authConfig.secret
      )
      req.userId = decoded.id
      return next()
    } catch (err) {
      return res.redirect('/')
    }
  }

  return res.redirect('/')
};
