const EmployeeModel = require("../model/EmployeeModel")
const axios = require('axios')

exports.addEmployee = async (request,response)=>{
    const reqData = request.body
    try{
        const storeData = {
            employeeName:reqData.employeeName,
            employeeEmail:reqData.employeeEmail,
            mobile:reqData.mobile,
            user_id:reqData.user_id
        }
       const res =  await EmployeeModel.create(storeData)
       if(res){
        response.json({
            status:"success",
            message:"Employee Create Succcessfully",
            data:res
        })
       }
       else{
        response.json({
            status:"failed",
            message:"invalid data",
        })
       }
    }
    catch(err){
        response.json({
            status:"failed",
            message:"Error"
        })
    }

}


exports.getAllEmployee = async(request,response)=>{

  let res =  await EmployeeModel.find()
   res = res.map(ele=>{
    ele.employeeName = ele.employeeName +" "+"manish"
    return ele
  })
  if(res){
    response.json({
        status:"success",
        data:res
    })
  }
}


exports.deleteEmployee = async (request,response,next)=>{
    try{
        const {id} = request.params
        const filter = {
            _id:id
        }
      const res =   await EmployeeModel.deleteOne(filter)
      if(res){
        response.json({
            status:"success",
            message:"delete successfully",
            data:res
        })
      }
    }
    catch(err){
        next(
            new AppError(401, "failed", "Delete Not Found"),
            req,
            res,
            next,
        );
    }
}


exports.searchEmployee = async (request,response)=>{
    const {search} = request.query
    try{
        const filter = {
            employeeName:{$regex:`/${search}/`}
        }

     const res =    await EmployeeModel.find(filter)
     if(res){
        response.json({
            status:"success",
            data:res
        })
     }
    }
    catch(err){

    }
}

exports.callApi = async (request,response)=>{
       const res =  await axios.get("https://reqres.in/api/users?page=2")
       if(res){
        response.json(res.data);
       }
}