const express = require('express')
const { verifyToken } = require('./src/middleware/AuthMiddleware')
const authRouter = require('./src/routes/AuthRoute')
//const EmployeeController = require('./controller/EmployeeController')
const crudRouter = require('./src/routes/CrudRoute')
const cors = require('cors');
const AppError = require('./src/utils/AppError');
const { Error } = require('./src/middleware/ErrorMiddeware');

const app = express()


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader("Access-Control-Allow-Method","GET , POST ,PUT ,DELETE,OPTIONS")
    res.setHeader("Access-Control-Allow-Headers","X-Requested-Width,Content-type, Origin, Accept, Authorization , *")
    res.setHeader("Access-Control-Allow-Credentials",true)
    next();
   })
//app.use(verifyToken)
app.use('/images', express.static(__dirname+'/public/uploads/'));
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