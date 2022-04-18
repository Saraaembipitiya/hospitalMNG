
//this is the process that made for handle all errors
const errHandler = (err,req,res,next) =>{
    console.log(err)
    res.json(err.message)
    
    

}

module.exports = errHandler