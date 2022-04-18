const express = require('express')
const Router = express.Router()
const multer = require('multer')
//middlewares
const auth  = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')
const {getAllD,getOneD,getAvaiableD,deleteOneD,updateOneD, postD} = require('../controllers/docter')

const FILE_TYPE_MAP =  {
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/png':'png'

}

//define multer storage

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        let isValid = FILE_TYPE_MAP[file.mimetype]
        let uploadError = new Error('Invalid image type')
        
        if(isValid){
            uploadError = null
        }
        cb(uploadError, 'public/upload')

    },
    filename: function(req,file,cb){
        const filename = file.originalname.split(' ').join('-')
        const extention = FILE_TYPE_MAP[file.mimetype]
        cb(null, `${filename}-${Date.now()}.${extention}`)
    }
})

const uploadOption =  multer({storage:storage})


Router.route('/').get(auth,isAdmin,getAllD).post(auth,uploadOption.single('image'),postD)
Router.route('/:id').get(auth,isAdmin,getOneD).put(auth,uploadOption.single('image'),updateOneD).delete(auth,isAdmin,deleteOneD)


module.exports = Router