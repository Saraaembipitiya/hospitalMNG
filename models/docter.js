const mongoose  = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    section:{
        type:String,
        enum:["Medical technologist",
              "Radiologic technician",
              "Dietician",
              "Respiratory therapist",
              "Registered nurse",
              "Occupational therapist",
              "Pharmacist"]
    },
    age:{
        type:Number
    },
    image:{
        type:String,
        required:true
    },
    email:{
        type:String,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"please provide a valid email"]
    },
    password:{
        type:String,
        required:true
    }
})
//this process will encrypt password before it store in db 
doctorSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
//this process will check this password that enterd by user
doctorSchema.methods.checkPassword = async function(pwd){
    return bcrypt.compare(this.password, pwd)
}
//this process will generate a json web token
doctorSchema.methods.genToken = async function(){
    return jwt.sign({id:this._id, role:"doctor"},process.env.SECRET,{expiresIn:"30d"})
}

module.exports = mongoose.model('Doctor', doctorSchema)
