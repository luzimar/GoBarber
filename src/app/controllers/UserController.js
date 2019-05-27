const { User, Provider } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
   const { path: avatar } = req.file
    if (req.body.provider === '1') {
      await Provider.create({ ...req.body, avatar })
    } else {
      await User.create({ ...req.body, avatar })
    }
    return res.redirect('/')
  }
}

module.exports = new UserController()
