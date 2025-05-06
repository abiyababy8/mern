//import controllers
const useController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
//1) import express
const express = require('express');
//2) create an object for class Router in Express
const router = new express.Router()
//3) define path
//3.1) user registration
router.post('/user/register', useController.registerUser)
//3.2) user login
router.post('/user/login', useController.loginUser)
//3.3) add project
router.post('/project/add', jwtMiddleware, multerConfig.single('projectImage'), projectController.addProject)

//4) export router
module.exports = router;