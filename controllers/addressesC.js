const Address = require("../models/adresses")
const User = require("../models/user")
const axios = require("axios")
const shortUrl = require("node-url-shortener");



function getrandom() {
    var random_string = Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5);
    return random_string()
}



const createUrl = async (req, res) => {
    try {
        const newAddress = new Address(req.body)
        console.log("body: ", req.body)
        console.log(newAddress.url.hostname);
        const sUrl = "http://localhost:3001/shortUrl/" + newAddress._id.toString().slice(-6)
        console.log("sUrl ", sUrl);
        const user = await User.findOne({ name: req.params.name })
        console.log(user);
        newAddress.newUrl = sUrl;
        newAddress.userId = user._id;
        await newAddress.save()
        await user.urlAdd.push(newAddress)
        await user.save()
        console.log("url created")
        res.status(200).json({ message: "url created", address: newAddress })
    } catch (error) {
        res.status(400).send(error.message)

    }
}

const findUrl = async (req, res) => {
    try {
        const urlS="http://localhost:3001/shortUrl/"+ req.params.newUrl;
        console.log("new url: ",urlS  )
        const address =await Address.findOne({ newUrl:urlS })
        console.log(address);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).redirect(address.url)
    } catch (error) {
        res.status(400).send(error.message)

    }


}


const deleteUrl = async (req, res) => {
    try {
        console.log("id: ", req.params.id)
        const address = await Address.findByIdAndDelete(req.params.id)
        const user = await User.findOne({ urlAdd: req.params.id })
        console.log(user);
        await user.urlAdd.remove(address)
        await user.save()
        console.log("url deleted")
        res.status(200).json({ message: "url removed", address: address })
    } catch (error) {
        res.status(400).send(error.message)

    }
}


// const deleteUrl = (req, res) => {

//     console.log("id: ", req.params.id)
//     const adresses = Address.findByIdAndDelete(req.params.id).then((user) => {
//         console.log("address removed")
//         res.status(200).json({ message: "address removed", user: user })
//     }).catch((err) => {
//         res.status(400).send(err.message)
//     })
// }


module.exports = { createUrl, deleteUrl, findUrl }
