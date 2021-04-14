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
app.set('view engine', 'ejs')


// const getUser =
app.get('/login/:id', (req, res) => {

    console.log("id: ", req.params.id)
    User.findById(req.params.id).then((user) => {
        console.log("success")
        // res.status(200).send(user)
        res.render('main', { user: user.name})
    }).catch((err) => {
        res.status(400).send(err.message)
    })
})
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