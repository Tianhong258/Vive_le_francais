const vocabulaireService = require("../models/vocabulaireService")

const getAllVocabulaires = async (req, res) => {
    try {
        const vocabulaires = await vocabulaireService.getAllVocabulaires();
        res.status(200).json(vocabulaires);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la récupération des vocabulaires.', error: error.message });
    }
};


module.exports = {
    getAllVocabulaires
}