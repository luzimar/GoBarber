const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
})

User.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 8)
})

User.methods = {
  checkPassword (password) {
    return bcrypt.compare(password, this.password)
  }
}

module.exports = mongoose.model('User', User)
