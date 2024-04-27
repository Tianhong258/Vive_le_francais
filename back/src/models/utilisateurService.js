const Utilisateur = require('./utilisateurSchema');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

const inscription = async (data) => {
    try{
    //faire 10 fois algorithmes de hash le mot de passe
    const hash = await bcrypt.hash(data.password, 10)
    const newUtilisateur = new Utilisateur({
        pseudo: data.pseudo,
        email: data.email,
        password: hash,        
    })
        await newUtilisateur.save()
        console.log(newUtilisateur)
        return newUtilisateur
    }catch(error) {
        throw error
    }
};

//todo : refacto cette fonction avec controlleur
const connection = async (data, res) => {
    try {
        const utilisateur = await Utilisateur.findOne({email: data.email})
        console.log(data)
         if( ! utilisateur){
            res.status(401).json({ message: "Paire identifiant/mot de passe incorrecte"})
         }else{
            try{
                const validPassword = await bcrypt.compare(data.password, utilisateur.password)//retourner une promise
                if( !validPassword ){
                    return res.status(401).json({ message: "Paire identifiant/mot de passe incorrecte"})
                } else {
                    res.status(200).json({
                        utilisateurs_Id : utilisateur._id,
                        token: jwt.sign(
                            { utilisateurs_Id: utilisateur._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    })
                }
            }catch (error) {
                throw error
            }
         }
    } catch (error) {
        throw error
    }
};

const modifier = async (data) => {
    try{
        //comment savoir l'utilisateur connecté 
        const modifierUtilisateur = await Utilisateur.findOneAndUpdate(utilisateur, data)
        .then(() => console.log('User updated'))
        .catch((err) => console.log(err));
    }catch(error){
        throw error
    }

}

// Delete a user
// User.deleteOne({ name: 'Jane Doe' })
//   .then(() => console.log('User deleted'))
//   .catch((err) => console.log(err));

module.exports = {
    inscription,
    connection

}
    