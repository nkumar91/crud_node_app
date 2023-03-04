const express = require('express')
const { verifyToken } = require('./middleware/AuthMiddleware')
const authRouter = require('./routes/AuthRoute')
//const EmployeeController = require('./controller/EmployeeController')
const crudRouter = require('./routes/CrudRoute')
const cors = require('cors');
const AppError = require('./utils/AppError');
const { Error } = require('./middleware/ErrorMiddeware');

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//app.use(verifyToken)
app.use("/auth",authRouter)
app.use("/crud",crudRouter)
app.use('*', (req, res, next) => {
    next(
        new AppError(404, "failed", "Route is not correct"),
        req,
        res,
        next,
    );
});

app.use(Error)



module.exports = app