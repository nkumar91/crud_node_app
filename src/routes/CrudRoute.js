const express = require('express');
const EmployeeController = require('../controller/EmployeeController');
const { verifyToken } = require('../middleware/AuthMiddleware');
const upload = require('../middleware/UploadMiddleware');
const crudRouter = express.Router()


crudRouter.delete('/deleteEmployee/:id',EmployeeController.deleteEmployee)
crudRouter.get("/searchEmployee",EmployeeController.searchEmployee)
crudRouter.get("/callApi",EmployeeController.callApi)
crudRouter.post('/uploadFile',upload.single('image'),EmployeeController.uploadFile)
crudRouter.get('/getAllImages',EmployeeController.getAllImages)
crudRouter.use(verifyToken);

crudRouter.post('/addEmployee',EmployeeController.addEmployee)
crudRouter.get('/allEmployee',EmployeeController.getAllEmployee)




module.exports =  crudRouter