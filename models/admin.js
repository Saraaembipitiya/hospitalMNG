const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const adminSchema = new mongoose.Schema({
    name:{type:String,
        required:true},
    branch:{
        type:String,
        enum:['colombo','matara','galle','kandy']
    },
    email:{
        type:String,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"please provide a valid email"],
        required:true
    },
    password:{
        type:String,
        required:true
    }
    
})


//this process will encrypt password before it store in db 
adminSchema.pre('save', async function(){
    const salt = bcrypt.genSalt(10)
    this.password = bcrypt.hash(this.password, salt)
})

//this process will check this password that enterd by user
adminSchema.methods.checkPassword = async function(pwd){
    return bcrypt.compare(this.password, pwd)
}


//this process will generate a json web token
adminSchema.methods.genToken = async function(){
    return jwt.sign({role:"Admin", id:this._id},process.env.SECRET,{expiresIn:"30d"})
}


module.exports = mongoose.model('Admin', adminSchema)