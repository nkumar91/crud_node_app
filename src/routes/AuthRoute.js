const express = require('express');
const AuthController = require('../controller/AuthController');
const { verifyToken } = require('../middleware/AuthMiddleware');
const authRouter = express.Router()


authRouter.post("/signup",AuthController.signup)
authRouter.post("/login",AuthController.login);

authRouter.post("/changePassword",verifyToken,AuthController.changePassword)

module.exports = authRouter