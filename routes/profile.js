const express = require('express')
const Router = express.Router()
const profile = require('../controllers/profile')
const auth = require('../middlewares/auth')

Router.route('/').get(auth,profile)

module.exports = Router