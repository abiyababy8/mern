const { findOneAndUpdate } = require("../Models/userSchema")
const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')

//user registration
exports.registerUser = async (req, res) => {
    //here we write logic to resolve the request
    //extract data send from front end in user request
    // 1) find whether the email is already registered in collection
    // 2) if found, send response back to FE , saying it is already present
    // 3) if not found, insert that data into DB
    console.log("Inside register user")
    console.log(req.body)
    const { name, email, password } = req.body
    try {
        //check whether user already registered
        const existingUser = await users.findOne({ email: email })
        if (existingUser) {

            res.status(409).json("Account already exists. Please Login !!!")
        }
        else {
            // insert that user into db DB
            console.log("User not found!!!")
            const newUser = new users({
                name: name,
                email: email,
                password: password,
                github: "",
                linkedin: "",
                profile: ""
            })
            await newUser.save()
            res.status(201).json(`${name} Registered successfully`)
        }

    }
    catch (err) {
        res.status(401).json("Register request failed due to", err)
    }

    //sending back response to FE
}
//user login
exports.loginUser = async (req, res) => {
    //here we write logic for login
    const { email, password } = req.body

    console.log("Inside login controller function", email, password)
    try {
        const existingUser = await users.findOne({ email: email, password: password })
        if (existingUser) {
            const token=jwt.sign({userId:existingUser._id},"supersecretkey")
            console.log("Token:",token)
            res.status(200).json({
                user_data:existingUser,
                jwt_token:token
            })
        }
        else {
            res.status(406).json("Login failed due to invalid email or password")
        }
    }
    catch (err) {
        res.status(401).json("Login blocked due to:", err)
    }
}