//contrôler les erruers liées à utilisateurs 
const { connection } = require("mongoose");
const utilisateur = require("../models/utilisateurService")

const inscription = async (req, res) => {
    try {
        const newUtilisateur = await utilisateur.inscription(req.body);
        res.status(201).json({ message: "Utilisateur bien créé !" });
        console.log(newUtilisateur + " bien créé ! ")
        return newUtilisateur
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Erreur lors de l'inscription", error: error.message });
    }
};

const connectionUtilisateur = async (req, res) => {
    try {
        const utilisateurConnecte = await utilisateur.connection(req.body, res);
    } catch (error) {
        res.status(500).json({ message: "Connection échouée", error: error.message });
    }
};

const profileUtilisateur = async (req, res) => {
    try {
        const utilisateurProfil = await utilisateur.profil(req);
        console.log(utilisateurProfil)
        if (utilisateurProfil) {
            return res.status(200).json(utilisateur);
        }
        return res.status(404).json("L'utilisateur n'existe pas !");
    } catch (error) {
        return res.status(501).json(error);
    }
}

const deconnectionUtilisateur = async (req, res) => {
    try {
        const utilisateurDeconnecte = await utilisateur.deconnection(req, res);
        res.status(200).json({ message: "Vous vous êtes déconnecté ! " });
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la déconnection !', error: error.message });
    }
}




module.exports = {
    inscription,
    connectionUtilisateur,
    profileUtilisateur,
    deconnectionUtilisateur
}