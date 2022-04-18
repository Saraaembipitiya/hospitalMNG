const jwt = require('jsonwebtoken')


//this process will authenticate the user by checking the token that stored at cookie
const auth  = (req,res,next) =>{
    const token  = req.cookies.t
    try {
        const user = jwt.verify(token, process.env.SECRET)
        req.user = user
        next()
    } catch (error) {
        res.status(404).send(error)
    }
}

module.exports = auth
