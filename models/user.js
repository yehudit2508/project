const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    password: {
        type: String, required: true
    },
    phone: {
        type: String
    },
    urlAdd: [{
        type: mongoose.Schema.Types.ObjectId, ref: "adresses"
    }]

})

module.exports = mongoose.model('user', userSchema)