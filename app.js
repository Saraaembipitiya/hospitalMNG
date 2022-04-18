const express= require('express')
const app = express()
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const error = require('./middlewares/errorHandler')
require('express-async-errors')
require('dotenv').config()
app.use('/public/upload/', express.static(__dirname+'/public/upload/'))
//import Routers
const pRouter = require('./routes/paitent')
const dRouter = require('./routes/docter')
const aRouter = require('./routes/appoinment')
const adRouter = require('./routes/admin')
const lRouter = require('./routes/login')
const prRouter = require('./routes/profile')
//json and cookie parser middlewares
app.use(express.json())
app.use(cookieParser())
//routing endpoints
app.use('/api/v1/appoinment', aRouter)
app.use('/api/v1/doctor', dRouter)
app.use('/api/v1/paitent', pRouter)
app.use('/api/v1/admin', adRouter)
app.use('/api/v1/login', lRouter)
app.use('/api/v1/profile', prRouter)
app.use(error)


//connect to the server
const start = async (conn) =>{
   await mongoose.connect(conn)
   await app.listen(6000)
   console.log('App is working on port 6000')



}

start(process.env.CONNECTION_STRING)