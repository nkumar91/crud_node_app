require('../config/Db')
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const { Collection } = require('../config/Collection')


const EmployeeSchema = new mongoose.Schema({
   employeeName: { type: String, required: [true, "Employee Name is Required"] },
   employeeEmail: { type: String, unique: true },
   mobile: { type: Number, required: [true, "Phone No Required"] },
   user_id:{type:ObjectId,required:[true,"User Id is Required"]},
})

const EmployeeModel = mongoose.model(Collection.crud, EmployeeSchema)
module.exports = EmployeeModel