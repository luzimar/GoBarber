const server = require('./server')
const mongoose = require('mongoose')
mongoose.connect(
  'mongodb+srv://luzimar:luzimar@cluster0-jtnnh.mongodb.net/omnistack?retryWrites=true',
  {
    useNewUrlParser: true
  }
)
server.listen(process.env.PORT || 3000)
