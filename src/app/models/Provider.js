const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Provider = new mongoose.Schema({
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

Provider.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 8)
})

Provider.methods = {
  checkPassword (password) {
    return bcrypt.compare(password, this.password)
  }
}

User.virtual("url").get(function(){
    const url = process.env.URL || 'http://localhost:3333';
    
    return `${url}/files/${encodeURIComponent(this.avatar)}`;
})

module.exports = mongoose.model('Provider', Provider)
