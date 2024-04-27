//avoir et manipulation des données (CRUD)
const Vocabulaire = require('./vocabulaireSchema');

const getAllVocabulaires = async()=>{
    try{
        const vocabulaires = await Vocabulaire.find();
        return vocabulaires;
      } catch (error) {
        throw error;
      }
    };

const creatVocabulaires = async(data) => {
    try{
      delete data._id;
      const vocabulaire = new Vocabulaire({...data});
      await vocabulaire.save()
      return vocabulaire
    } catch(error){
      throw error
    } 
    };

const getOneVocabulaire = async(data)=>{
  try{
      const vocabulaire = await Vocabulaire.findOne({ _id: data.id })
      return vocabulaire;
    } catch (error) {
      throw error;
    }
  };

const updateVocabulaire = async(data)=>{
    try{
        const vocabulaire = await Vocabulaire.updateOne({ _id: data.params.id }, { ...data.body, _id: data.params.id })
        return vocabulaire;
      } catch (error) {
        throw error;
      }
    };

const deleteVocabulaire = async(data)=>{
  try{
      const vocabulaire = await Vocabulaire.deleteOne({ _id: data.params.id })
      return vocabulaire;
    } catch (error) {
      throw error;
    }
  };

   

module.exports = {
    getAllVocabulaires,
    creatVocabulaires,
    getOneVocabulaire,
    updateVocabulaire,
    deleteVocabulaire
}
    
