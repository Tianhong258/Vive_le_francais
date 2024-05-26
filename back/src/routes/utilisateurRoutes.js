const express = require('express');
const utilisateurController = require('../controllers/utilisateurController');
const router = express.Router();
const utilisateur = require('../middleware/utilisateur');

router.post('/inscription', utilisateurController.inscription);
router.post("/connection", utilisateurController.connectionUtilisateur)
router.get("/:id", utilisateur, utilisateurController.profileUtilisateur)
//router.put("/:id", utilisateurController)
//router.delete("/:id", utilisateurController)

module.exports = router