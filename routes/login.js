const express = require('express')
const Router = express.Router()
const login = require('../controllers/login')

Router.post('/', login)

module.exports = Router