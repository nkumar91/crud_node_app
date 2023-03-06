const AuthModel = require("../model/AuthModel");
const { verifyPassword, expireTokenTime, encodePass } = require("../utils/Utils");
const jwt = require('jsonwebtoken');
const { request, response } = require("express");
require('dotenv').config()
exports.signup = async (request,response)=>{
    try{
        const signupData = request.body
        const query = {
            name:signupData.name,
            email:signupData.email,
            password:signupData.password
        }
     const res =   await AuthModel.create(query)
     if(res){
        response.json({
            status:"success",
            message:"signup Successfully",
        })
     }
    }
    catch(error){
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
              errors[key] = error.errors[key].message;
            });
            response.json({
                status:'failed',
                error:errors
            })
          }
          else{

          response.json({
            status:'failed',
            messgae:"invalid details"
        })
    }
      
    }
}


exports.login = async (request,response)=>{
    try{
        const loginData = request.body
        const query = {
            email:loginData.email
        }
        const dbRes = await AuthModel.findOne(query,{password:1,name:1,email:1})
        if(dbRes){
           const isCompare =  await verifyPassword(loginData.password,dbRes.password)
           if(isCompare){
            const payload = {
                name:dbRes.name,
                email:dbRes.email,
                user_id:dbRes._id
            }
            const token = jwt.sign(payload,process.env.SCERET_KEY,expireTokenTime())

            response.json({
                status:"success",
                message:"Login Successfully",
                token:token
            })
           }
           else{
            response.json({
                status:'failed',
                message:"Incorrect  Password"
            })
           }
        }
        else{
            response.json({
                status:'failed',
                message:"Incorrect Email Id"
            })
        }
       

    }catch(err){
        response.json({
            status:'failed',
            message:"Invalid Details"
        })
    }
}


exports.changePassword = async(request,response,next)=>{
    try{
        const reqData = request.body
        const query = 
                {_id:reqData.user_id}

       const res = await AuthModel.findOne(query)
       if(res){
       
            if(await verifyPassword(reqData.old_pass,res.password))
            {
               const filter = {
                _id:reqData.user_id,
               } 

               const update = {
                    password: await encodePass(reqData.new_pass)  
               }
             const res =  await AuthModel.updateOne(filter,update)
             if(res){
                response.json({
                    status:'success',
                    message:"update Successfully"
                }) 
             }
            }
            else{
                response.json({
                    status:'failed',
                    message:"Old password not correct"
                })
            }
       }
       else{
        response.json({
            status:'failed',
            message:"incorrect email or id"
        })
       }

    }
    catch(err){
        response.json({
            status:'failed',
            message:"error"
        })
    }
}