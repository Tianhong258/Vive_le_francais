//Récupérer express et la fonction publicationControllers
const express = require("express");
const vocabulaireController = require("../controllers/vocabulaireController");
const utilisateur = require('../middleware/utilisateur');

//Création d'un router
const router = express.Router();

//todo: aujouter middleWare utilisateur
router.get("/", vocabulaireController.getAllVocabulaires)
router.post("/", vocabulaireController.creatVocabulaires)
router.get('/mon-cahier/detail-mot/:id', vocabulaireController.getOneVocabulaire)//ce sont les id du mot de vocabulaire
router.put('/:id', vocabulaireController.updateVocabulaire)
router.delete('/:id', vocabulaireController.deleteVocabulaire)

module.exports = router