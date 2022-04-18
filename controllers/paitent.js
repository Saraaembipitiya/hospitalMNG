const Paitent = require('../models/paitent')
const Appoinment = require('../models/appoinment')


//get all paitents
exports.getAllP = async (req,res) =>{

    const {name} =  req.query
    let search={}
 
    if(name){
    search.name = {$regex:name, $options:'i' }
    
   }
    const paitent = await Paitent.find(search)
    res.status(200).send(paitent)
    
}
//post a paitent
exports.postP = async (req,res) =>{

    const filename = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/upload/`

    req.body.image = `${filename}${basePath}`

    
    const paitent = await Paitent.create(req.body)
    const token = await paitent.genToken()
    res.cookie('t', token)
    res.status(200).send(paitent)
}
//get one paitent
exports.getOneP = async (req,res) =>{
    const paitent = await Paitent.findById(req.params.id)
    
    
    res.status(200).send(paitent)
}
//delete one paitent
exports.deleteOneP = async (req,res) =>{
    const paitent  = await Paitent.findByIdAndDelete(req.params.id)
    res.status(200).send(paitent)    
}
//update one paitent
exports.updateOneP = async (req,res) =>{
    const pai  = Paitent.findById(req.params.id)
    if(req.file){
        const filename = req.file.filename
        const basePath = `${req.protocol}://${req.get('host')}/public/upload/`
        req.body.image = `${filename}${basePath}`

    }else{
        req.body.image = pai.image
    }
    const paitent = Paitent.findByIdAndUpdate(req.params.id ,req.body, {new:true, runValidators:true})
    res.status(200).send(paitent)

}
//get appoinments of the paitent
exports.appoinmentP = async (req,res) =>{
 const appoinments = await Appoinment.find({paitent:req.params.id})
 res.status(200).send(appoinments)


}