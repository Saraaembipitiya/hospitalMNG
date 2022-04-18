const Admin = require('../models/admin')
const Paitent = require('../models/paitent')
const Doctor  = require('../models/docter')



//this process is authenticate user and automaticaly generate the token and store it in a cookie. 
//first of all this process will check is the email's owner in admin, if is it true algorithem will check password and generate the token
// if it be false algorithem check the doctors collection and follow the same process

const login = async (req,res) =>{

    Admin.findOne({email:req.body.email}).then(async(admin)=>{
        const check = await admin.checkPassword(req.body,password)
        if(check){
            const token = await admin.genToken()
            res.cookie('t', token)
            res.status(200).send({msg:'authenticated'})
        }else{
            res.status(401).send('Invalid password')
        }
    }).catch(async(err)=>{
         Doctor.findOne({email:req.body.email}).then(async(doctor)=>{
        const check = await doctor.checkPassword(req.body,password)
        if(check){
            const token = await doctor.genToken()
            res.cookie('t', token)
            res.status(200).send({msg:'authenticated'})
        }else{
            res.status(401).send('Invalid password')
        }
    }).catch((err)=>{
        Paitent.findOne({email:req.body.email}).then(async(paitent)=>{
            const check = await paitent.checkPassword(req.body.password)
            
        if(check){
            
            const token = await paitent.genToken()
            res.cookie('t', token)
            res.status(200).send({msg:'authenticated'})
            
        }else{
            res.status(401).send('Invalid password')
        }
        }).catch((err)=>{
            res.status(404).send(err)
        })
    })

    })

}

module.exports = login