const User = require("../models/user")



const createUser = (req, res) => {
    console.log("body: ", req.body)
    const newUser = new User(req.body)
    newUser.save().then((user) => {
        console.log("user created")
        res.status(200).json({ message: "user created", user: newUser })
    }).catch((err) => {
        res.status(400).send(err.message)
    })

}


const getUser = (req, res) => {

    console.log("id: ", req.params.id)
    User.findById(req.params.id).then((user) => {
        console.log("success  ",user.name)
        // res.status(200).send(user)
        res.write(user.name);
    }).catch((err) => {
        res.status(400).send(err.message)
    })
}

const updUser = (req, res) => {

    console.log("id: ", req.params.password)
    const user = User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((user) => {
        console.log("user updated")
        res.status(200).json({ message: "user updated", user: user })
    }).catch((err) => {
        res.status(400).send(err.message)
    })
}

const deleteUser = (req, res) => {

    console.log("id: ", req.params.password)
    const user = User.findByIdAndDelete(req.params.id).then((user) => {
        console.log("user removed")
        res.status(200).json({ message: "user removed", user: user })
    }).catch((err) => {
        res.status(400).send(err.message)
    })
}


module.exports = { createUser, getUser, updUser, deleteUser }
