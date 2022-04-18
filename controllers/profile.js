const Admin = require('../models/admin')
const Paitent = require('../models/paitent')
const Doctor  = require('../models/docter')
const Appoinment = require('../models/appoinment')


//this process will check what is the role of user and return their profiles

const profile = async (req,res) =>{
    if(req.user.role === 'paitent'){
       const paitent =  await Paitent.findById(req.user.id)
       const appoinment = await Appoinment.find({paitent:req.user.id})
      return res.status(200).send({personal_details:paitent, totalAppoinments:appoinment})
    }

    if(req.user.role === 'doctor'){
       const doctor =  await Doctor.findById(req.user.id)
       const appoinment = await Appoinment.find({doctor:req.user.id})
      return res.status(200).send({personal_details:doctor, totalAppoinments:appoinment})       
    }

    if(req.user.role === 'Admin'){
       const admin  = await Admin.findById(req.user.id)
      return res.status(200).send(admin) 
    }
}

module.exports = profile