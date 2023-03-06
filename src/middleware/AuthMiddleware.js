const jwt = require('jsonwebtoken')
require('dotenv').config()
exports.verifyToken = async (request,response,next)=>{

    try{
    const token = request.headers['authorization'].split(" ")[1]
    const verify = jwt.verify(token,process.env.SCERET_KEY)
   if(verify){
    request.body.user_id = verify.user_id
    request.body.login_email = verify.email
    next()
   }
   else{
    response.json({
        status:"failed",
        message:"unautorized token !!"
    })
   }
}catch(err){
    response.status(400).json({
        status:"failed",
        message:"unautorized token !!"
    })
}
}