
//user registration
exports.registerUser = (req, res) => {
    //here we write logic to resolve the request
    console.log("Inside register user")
    //sending back response to FE
    res.status(201).json("Register request received")
}
//user login
exports.loginUser = (req, res) => {
    //here we write logic for login
    console.log("Inside login controller function")
    //sending back response to FE
    res.status(201).json("User Login Successfully")
}