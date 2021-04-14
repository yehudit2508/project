const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const router= require('./routs/api')
const app = express()
app.use(bodyParser.json())
app.use(router)
dotenv.config()
const User = require("./models/user")
var cors = require('cors')
app.use(cors());


app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://localhost:3001");
    next();
});

const connectionParams={
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true

}


mongoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => {
        console.log("connected");
    })
    .catch((err) => {
        console.log(`connection failed${err}`);
    })








    
app.listen(3001, () => {
    console.log("listening on");
})
