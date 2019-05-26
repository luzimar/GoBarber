const { Provider, Appointment } = require('../models')
class AppointmentController {
  async create (req, res) {
    const provider = await Provider.findById(req.params.provider)

    return res.render('appointments/create', { provider })
  }

  async store (req, res) {
    const { userId } = req
    const { provider } = req.params
    const { date } = req.body
    await Appointment.create({
      date,
      user_id: userId,
      provider_id: provider
    })

    return res.redirect('/app/dashboard')
  }
}

module.exports = new AppointmentController()
