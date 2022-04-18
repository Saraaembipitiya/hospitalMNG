const express = require('express')
const Router = express.Router()
const auth  = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

const {getAllA, getOneA, getCompletedA, updateOneA, deleteOneA, postA} = require('../controllers/appoinment')


Router.route('/').get(auth,isAdmin,getAllA).post(auth,postA)
Router.route('/:id').get(auth,isAdmin,getOneA).put(auth,isAdmin,updateOneA).delete(auth,isAdmin,deleteOneA)
Router.get('/finished', auth,isAdmin, getCompletedA )

module.exports = Router