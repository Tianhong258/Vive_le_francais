const express = require('express');
const utilisateurController = require('../controllers/utilisateurController');
const router = express.Router();

router.post('/inscription', utilisateurController.inscription);
router.post("/connection", utilisateurController.connectionUtilisateur)
//router.get("/:id", utilisateurController)
//router.put("/:id", utilisateurController)
//router.delete("/:id", utilisateurController)

module.exports = router