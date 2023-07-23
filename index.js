`use strict`
const express = require("express")
const app = express()

const cors = require('cors');
require("dotenv").config()
const RouteAxios = require('./Routes/RouteAxios')
const RouteDB=require('./Routes/RouteDB')
const notFoundError = require('./errors/404')
const serverError = require('./errors/500');
const client = require("./client");
app.use(cors())
app.use(express.json())
app.use(RouteAxios)
app.use(RouteDB)


app.use(notFoundError)
app.use(serverError)





client.connect(() => {
    app.listen(3003, () => {
        console.log('Server listen to 3003 port')


    })
})