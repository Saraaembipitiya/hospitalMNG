const Admin = require('../models/admin')

//Admin can add new admin,  admin can delete or update other admins details 
exports.addNew = (req,res) =>{
    Admin.create(req.body).then(async(admin)=>{
        const token = await admin.genToken()
        res.cookie('t', token)

        res.status(200).send(admin)

    }).catch((err)=>{
        res.status(404).send(err.message+" "+"User ont authenticated")
    })
}