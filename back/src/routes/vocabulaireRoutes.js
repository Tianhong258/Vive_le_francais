//Récupérer express et la fonction publicationControllers
const express = require("express");
const vocabulaireController = require("../controllers/vocabulaireController");
const utilisateur = require('../middleware/utilisateur');

//Création d'un router
const router = express.Router();

//todo: aujouter middleWare utilisateur
router.get("/", utilisateur, vocabulaireController.getAllVocabulaires)
router.post("/", utilisateur, vocabulaireController.creatVocabulaires)
router.get('/:id', utilisateur, vocabulaireController.getOneVocabulaire)//ce sont les id du mot de vocabulaire
router.put('/:id', utilisateur, vocabulaireController.updateVocabulaire)
router.delete('/:id', utilisateur, vocabulaireController.deleteVocabulaire)

module.exports = router 