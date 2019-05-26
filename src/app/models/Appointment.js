const mongoose = require('mongoose')

const Appointment = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  provider_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider'
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Appointment', Appointment)
