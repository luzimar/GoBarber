const { Appointment } = require('../models')
const moment = require('moment')

async function getAppointmentsToProvider (userId, date) {
  let appointments = await Appointment.find({
    provider_id: userId,
    date: {
      $gte: date.startOf('day').format(),
      $lt: date.endOf('day').format()
    }
  }).populate('user_id')

  let formatedAppointments = appointments.map(appointment => {
    return {
      date: moment(appointment.date).format('DD/MM/YYYY HH:mm'),
      name: appointment.user_id.name,
      avatar: appointment.user_id.avatar
    }
  })
  return formatedAppointments
}

class DashboardProviderController {
  async index (req, res) {
    const user = req.session.user
    return res.render('dashboardProvider', { user })
  }

  async getAppointments (req, res) {
    const { userId } = req
    const date = moment(parseInt(req.query.date))
    const appointments = await getAppointmentsToProvider(userId, date)
    return res.render('available/appointmentsByProvider', { appointments })
  }
}

module.exports = new DashboardProviderController()
