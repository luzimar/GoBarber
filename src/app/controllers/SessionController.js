const { User, Provider } = require('../models')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

function generateToken ({ id }) {
  return jwt.sign({ id }, authConfig.secret, {
    expiresIn: authConfig.ttl
  })
}

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password, provider } = req.body
    let user = {}
    if (provider === '1') {
      user = await Provider.findOne({ email: email })
    } else {
      user = await User.findOne({ email: email })
    }
    if (!user) {
      req.flash('error', 'Credenciais incorretas')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      req.flash('error', 'Senha incorreta')
      return res.redirect('/')
    }

    req.session.user = user
    req.session.token = generateToken(user)

    if (provider === '1') {
      return res.redirect('/app/dashboardProvider')
    }

    return res.redirect('/app/dashboard')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      return res.redirect('/')
    })
  }
}

module.exports = new SessionController()
