const mongoose  = require('mongoose')

const appoinmentSchema = new mongoose.Schema({
    topic:{
        type:String,
        required:true
    },
    paitent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Paitent'
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor'
    },
    case:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending','completed','canceled'],
        default:'pending'
    },
    applicatedDate:{
        type:Date,
        default:Date.now()
    }
})


module.exports = mongoose.model('Appoinment', appoinmentSchema)


