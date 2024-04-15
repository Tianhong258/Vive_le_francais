const { request } = require('express')
const mongoose = require('mongoose')

const uniqueValidator = require("mongoose-unique-validator")

const userSchema = mongoose.Schema({
    pseudo: {type: String, required : true, unique: true}, 
    email: {type: String, minlength : 6, required: true},
    password: {type: String, required : true}
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User",userSchema)