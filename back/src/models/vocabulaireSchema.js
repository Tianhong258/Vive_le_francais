const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const vocabulaireSchema = mongoose.Schema({
    fr : {type : String, required : true, unique : true},
    ch : {type : String, required : true},
    jeux : {type : String, required : true}
},{strict:false,
versionKey: false})

vocabulaireSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Vocabulaire", vocabulaireSchema, "vocabulaires")