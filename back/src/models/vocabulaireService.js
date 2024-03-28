//avoir et manipulation des données (CRUD)
const Vocabulaire = require('./vocabulaireShema');

const getAllVocabulaires = async()=>{
    try{
        const vocabulaire = await Vocabulaire.find();
        return vocabulaire;
      } catch (error) {
        throw error;
      }
    };
module.exports = {
    getAllVocabulaires
}
    
