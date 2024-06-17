const express = require('express');
const utilisateurController = require('../controllers/utilisateurController');
const router = express.Router();
const utilisateur = require('../middleware/utilisateur');

router.post('/inscription', utilisateurController.inscription);
router.post("/connection", utilisateurController.connectionUtilisateur)
router.get("/deconnection", utilisateur, utilisateurController.deconnectionUtilisateur)
router.get("/profil/:id", utilisateur, utilisateurController.profileUtilisateur)
router.put("/:id", utilisateur, utilisateurController.modificationUtilisateur)
router.delete("/:id", utilisateur, utilisateurController.deleteUtilisateur)

module.exports = router