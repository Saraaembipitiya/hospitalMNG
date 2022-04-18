const express = require('express')
const Router = express.Router()
const multer = require('multer')
//middlwares
const isAdmin = require('../middlewares/isAdmin')
const auth  = require('../middlewares/auth')


const FILE_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg'
}

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        let isValid = FILE_TYPE_MAP[file.mimetype]
        let uploadError = 'file type missmatch'
        //check the extention is valid
        if(isValid){
            uploadError = null
        }

        cb(uploadError, 'public/upload')
    },
    filename:function(req,file,cb){
        const filename = file.originalname.split(' ').join('-')
        const extention = FILE_TYPE_MAP[file.mimetype]
        //generate creative file name
        cb(null, `${filename}-${Date.now()}.${extention}`)
    }


    
})

const uploadOption = multer({storage:storage})


const {getAllP, getOneP,deleteOneP,appoinmentP,updateOneP, postP} = require('../controllers/paitent')


Router.route('/').get(auth,isAdmin,getAllP).post(uploadOption.single('image'),postP)
Router.route('/:id').get(auth,isAdmin,getOneP).put(auth,isAdmin,uploadOption.single('image'),updateOneP).delete(auth,deleteOneP)
Router.get('/appoinments', auth,isAdmin, appoinmentP )

module.exports = Router