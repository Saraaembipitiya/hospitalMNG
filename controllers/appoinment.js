const Appoinment = require('../models/appoinment')


//get all appoinments
exports.getAllA = async (req,res) =>{
    const appoinment = await Appoinment.find().populate('doctor paitent')
    res.status(200).send(appoinment)

}
//post an appoinment
exports.postA = async (req,res) =>{
    req.body.paitent = req.user.id
    const appoinment = await Appoinment.create(req.body)
    res.status(200).send(appoinment)

}

//get one appoinment
exports.getOneA = async (req,res) =>{
    const appoinment = await Appoinment.findById(req.params.id)
    res.status(200).send(appoinment)

}
//delete an appoinment
exports.deleteOneA = async (req,res) =>{
    const appoinment = await Appoinment.findByIdAndDelete(req.params.id)
    res.status(200).send(appoinment)
}
//update an appoinment
exports.updateOneA = async (req,res) =>{
    const appoinment = await Appoinment.findByIdAndUpdate
    (req.params.id,{status:req.body.status}, {new:true, runValidators:true})
    res.status(200).send(appoinment)
}
//get completed appoinments
exports.getCompletedA = async (req,res) =>{
   const appoinment = await Appoinment.find({status:'completed'})
   res.status(200).send(appoinment)
}