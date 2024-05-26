const { request } = require('express')
const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator")


const utilisateurSchema = mongoose.Schema({
    pseudo: {type: String, minlength : 2, required : true, unique: true}, 
    email: {type: String,
        //    validate: {
        //     validator: async function(email) {
        //       const user = await this.constructor.findOne({ email });
        //       if(user) {
        //         if(this._id === user._id) {
        //           return true;
        //         }
        //         return false;
        //       }
        //       return true;
        //     },
        //     message: props => 'The specified email address is already in use.'
        //   },
      required: true, unique: true},
    password: {type: String, minlength : 4,  required : true} 
},{strict:false,versionKey: false})

utilisateurSchema.plugin(uniqueValidator, { message: '{PATH} est déjà utilisé.' })

module.exports = mongoose.model("Utilisateur",utilisateurSchema,"utilisateurs")