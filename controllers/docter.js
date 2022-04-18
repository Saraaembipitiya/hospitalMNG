const Doctor = require('../models/docter')

//get all doctors
exports.getAllD = async (req,res) =>{
   const {select} = req.query
   const {name} = req.query
   let search={}
   

   if(name){
    search.name = {$regex:name, $options:'i' }
    
   }
   if(select){
       search.section = select
   }


   

   console.log(search)
   const doctor = await Doctor.find(search)
   res.status(200).send(doctor)
}
//post a doctor
exports.postD = async (req,res) =>{
    filename = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/upload/`
    req.body.image = `${basePath}${filename}`
    const doctor = await Doctor.create(req.body)
    const token = await doctor.genToken()
    res.cookie('t', token)
    res.status(200).send(doctor)
}
//get one doctor
exports.getOneD = async (req,res) =>{
    const doctor = await Doctor.findById(req.params.id)
    res.status(200).send(doctor)
}
//delete one doctor
exports.deleteOneD = async (req,res) =>{
    const doctor = await Doctor.findByIdAndDelete(req.params.id)
    res.status(200).send(doctor)
}
//update one doctor
exports.updateOneD = async (req,res) =>{
    const doc = Doctor.findById(req.params.id)
    if(req.file){
        const basePath = `${req.protocol}://${req.get('host')}/public/upload/`
        const filename = req.file.filename
        req.bodt.image = `${basePath}${filename}`
    }else{
        req.body.image = doc.image
    }
    const docter = await Doctor.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
}

