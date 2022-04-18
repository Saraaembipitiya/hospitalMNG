const express = require('express')
const Router = express.Router()
const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

const {addNew} = require('../controllers/admin')


Router.post('/',auth,isAdmin,addNew)

module.exports = Router