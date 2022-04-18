const mongoose  = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const paitentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name must be required']
    },
    age:{
        type:Number,
        required:[true, 'age must be required']
    },
    email:{
        type:String,
        required:[true, 'email must be required'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"please provide a valid email"]
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }

})

//this process will encrypt password before it store in db 
paitentSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash( this.password, salt)
})
//this process will check this password that enterd by user
paitentSchema.methods.checkPassword = async function(pwd){
    console.log(this.password)
    console.log(pwd)
    return bcrypt.compare( pwd, this.password)
}
//this process will generate a json web token
paitentSchema.methods.genToken = async function(){
    return jwt.sign({id:this._id, role:"paitent"},process.env.SECRET,{expiresIn:"30d"})
}


module.exports = mongoose.model('Paitent', paitentSchema)