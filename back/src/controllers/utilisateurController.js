//contrôler les erruers liées à utilisateurs 
const { connection } = require("mongoose");
const utilisateurService = require("../models/utilisateurService")

const inscrption = async (req, res) => {
    try {
        const infoUtilisateur = await utilisateurService.inscrption();
        res.status(200).json(infoUtilisateur);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'inscrption", error: error.message });
    }
};


module.exports = { 
    inscrption,
    connection

}