//this process will check about is the user an admin.

const isAdmin = async(req,res) =>{
    if(req.user.role === 'Admin'){
        return next()
    }
    throw new Error(`You are not a admin, You are a ${req.user.role}`)
}

module.exports = isAdmin