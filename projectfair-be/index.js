//1) import dotenv
require('dotenv').config()
//2) import express
const express = require('express')
//import connection.js file
require('./DB/connection')
//3) import cors
const cors = require('cors')
//A)import router
const router = require('./Routes/router')
//4) create server
const pfServer = express();
//5) cors need to be used in pfServer
pfServer.use(cors())
//6) use middleware to convert json data to js object
pfServer.use(express.json())
//B) use router
pfServer.use(router)
//we have to export the folder uploads to outside to access it
pfServer.use('/uploads', express.static('./uploads'))
// first argument is the path, that we can use in FE to access, the folder we exported
// second argument; the folder we have to export
//7) define PORT 
const PORT = 5000
//8) run the server
pfServer.listen(PORT, () => {
    console.log(`Server is running in port: ${PORT}`)
})
pfServer.get('/', (req, res) => {
    res.send("PF Server is running and waiting for request")
})