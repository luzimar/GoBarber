const { Provider } = require('../models')

class DashboardController {
  async index (req, res) {
    const user = req.session.user
    const providers = await Provider.find({})
    return res.render('dashboard', { user, providers })
  }
}

module.exports = new DashboardController()
