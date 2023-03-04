const bcrypt = require('bcryptjs');
exports.encodePass = async (password)=>{
    const salt = bcrypt.genSaltSync(10)
    password = bcrypt.hashSync(password,salt);
    return password
}

exports.verifyPassword = async (pass,hash)=>{
   return  bcrypt.compareSync(pass,hash);
}

exports.expireTokenTime = function(){
    return  {expiresIn: "30d"}
}

