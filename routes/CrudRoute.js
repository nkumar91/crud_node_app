const express = require('express');
const EmployeeController = require('../controller/EmployeeController');
const { verifyToken } = require('../middleware/AuthMiddleware');
const crudRouter = express.Router()
crudRouter.delete('/deleteEmployee/:id',EmployeeController.deleteEmployee)
crudRouter.get("/searchEmployee",EmployeeController.searchEmployee)
crudRouter.get("/callApi",EmployeeController.callApi)
crudRouter.use(verifyToken);

crudRouter.post('/addEmployee',EmployeeController.addEmployee)
crudRouter.get('/allEmployee',EmployeeController.getAllEmployee)



module.exports =  crudRouter