const { Provider } = require('../models')

class DashboardController {
  async index (req, res) {
    const providers = await Provider.find({})
    return res.render('dashboard', { providers })
  }
}

module.exports = new DashboardController()
