const express = require('express')
const multer = require("multer")
const multerConfig = require('./config/multer')
//const upload = require('multer')(multerConfig)
const { authMiddleware, guestMiddleware } = require('./app/middlewares')
const routes = express.Router()
const { UserController, SessionController,
  DashboardController, DashboardProviderController,
  FileController, AppointmentController,
  AvailableController } = require('./app/controllers')

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')
  return next()
})

routes.get('/', guestMiddleware, SessionController.create)
routes.get('/signup', guestMiddleware, UserController.create)
routes.get('/app/logout', SessionController.destroy)

routes.post('/signin', SessionController.store)
//routes.post('/signup', upload.single('avatar'), UserController.store)
routes.post('/signup', multer(multerConfig).single('avatar'), UserController.store)

// Middleware que não permite usuário logado acessar rotas internas do app
routes.use('/app', authMiddleware)

routes.get('/app/dashboard', DashboardController.index)
routes.get('/app/dashboardProvider', DashboardProviderController.index)
routes.get('/app/dashboardProvider/getAppointments', DashboardProviderController.getAppointments)


routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.post('/app/appointments/new/:provider', AppointmentController.store)

routes.get('/app/available/:provider', AvailableController.index)

module.exports = routes
