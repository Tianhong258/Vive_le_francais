const { request } = require('express')
const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator")

const utilisateurSchema = mongoose.Schema({
    pseudo: {type: String, required : true, unique: true}, 
    email: {type: String, required: true, unique: true},
    password: {type: String, minlength : 4, required : true}
},{strict:false,versionKey: false})

utilisateurSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Utilisateur",utilisateurSchema,"utilisateurs")