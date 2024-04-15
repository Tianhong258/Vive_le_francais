//Récupérer express et la fonction publicationControllers
const express = require("express");
const vocabulaireController = require("../controllers/vocabulaireController");

//Création d'un router
const router = express.Router();

router.get("/", vocabulaireController.getAllVocabulaires);
//router.post("/:id",vocabulaireController.postNewVocabulaire);

module.exports = router