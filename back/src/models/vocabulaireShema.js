const mongoose = require("mongoose")

const vocabulaireSchema = mongoose.Schema({
    fr : {type : String, required : true},
    ch : {type : String, required : true},
    jeux : {type : String, required : true}
},{strict:false})

module.exports = mongoose.model("Vocabulaire", vocabulaireSchema,"vocabulaire")