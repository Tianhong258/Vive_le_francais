const Utilisateur = require('./utilisateurSchema');
const bcrypt = require("bcrypt")

const inscrption = async (req, res, next) => {
    try {
        //faire 10 fois algorithmes de hash le mot de passe
       const hash = await bcrypt.hash(req.body.password, 10)
       const newUtilisateur = await new Utilisateur({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash,
        });
        try{
            await newUtilisateur.save();
            res.status(201).json({ message: "Utilisateur bien créé !" });
        }catch(error){
            res.status(400).json({ message: "Erreur lors de la création de l'utilisateur. ", error: error.message });
        }
    } catch (error) {
        throw error;
    }
};

const connection = async (req, res, next) => {
    try {
        // const utilsateur = await Utilisateur.findOne({email: req.body.email})
        // if(utilsateur===null){
            
        // }
    } catch (error) {
        
    }
};


module.exports = {
    inscrption,
    connection

}
    