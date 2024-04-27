//contrôle seulement les erreurs
const vocabulaireService = require("../models/vocabulaireService")

const getAllVocabulaires = async (req, res) => {
    try {
        const vocabulaires = await vocabulaireService.getAllVocabulaires();
        res.status(200).json(vocabulaires);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la récupération des vocabulaires.', error: error.message });
    }
};

const creatVocabulaires = async(req, res) =>{
    try{
        const newVocabulaire = await vocabulaireService.creatVocabulaires(req.body)
        res.status(201).json({ message: 'Vocabulaire enregistré :', vocabulaire: newVocabulaire})
    } catch(error){
        console.error(error)
        res.status(400).json({ message : "Erreur lors de la création du mot de vocabulaire.", error: error.message });
      
    }
}

const getOneVocabulaire = async (req, res) => {
    try {
        const vocabulaires = await vocabulaireService.getOneVocabulaire(req.params);
        res.status(200).json(vocabulaires);
    } catch (error) {
        res.status(404).json({ message: 'Impossible de trouver ce mot de vocabulaire.', error: error.message });
    }
};

const updateVocabulaire = async (req, res) => {
    try {
        const vocabulaire = await vocabulaireService.updateVocabulaire(req);
        res.status(200).json(vocabulaire);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la modification du mot de vocabulaire.', error: error.message });
    }
};


const deleteVocabulaire = async (req, res) => {
    try {
        const vocabulaire = await vocabulaireService.deleteVocabulaire(req);
        res.status(200).json(vocabulaire);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la suppession du mot de vocabulaire.', error: error.message });
    }
};




module.exports = {
    getAllVocabulaires,
    creatVocabulaires,
    getOneVocabulaire,
    updateVocabulaire,
    deleteVocabulaire

}