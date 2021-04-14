const mongoose = require('mongoose')
const shortId= require('shortid')


const addrSchema = mongoose.Schema({
    url: { type: String },
    newUrl: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
})

module.exports = mongoose.model('address', addrSchema)