const Utilisateur = require('./utilisateurSchema');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const inscription = async (data) => {
    try {
        //faire 10 fois algorithmes de hash le mot de passe, salt=10
        const hash = await bcrypt.hash(data.data.password, 10)
        const newUtilisateur = new Utilisateur({
            pseudo: data.data.pseudo,
            email: data.data.email,
            password: hash,
        })
        await newUtilisateur.save()
        console.log(newUtilisateur)
        return newUtilisateur
    } catch (error) {
        throw error
    }
};


const connection = async (data, res) => {
    try {
        const utilisateur = await Utilisateur.findOne({ email: data.data.email })
        console.log(data)
        if (!utilisateur) {
            return res.status(401).json({ message: "Paire identifiant/mot de passe incorrecte" })
        }
        const validPassword = await bcrypt.compare(data.data.password, utilisateur.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Paire identifiant/mot de passe incorrecte" });
        }

        const token = jwt.sign(
            {
                utilisateurs_Id: utilisateur._id,
                pseudo: utilisateur.pseudo
            },
            'vive-le-francais',
            { expiresIn: '24h' }
        );
        res.cookie('token', token, {
            //httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60,
            //maxAge: 24 * 60 * 60 * 1000, //24h
            sameSite: 'strict'
        });
        res.status(200).json({
            utilisateurs_Id: utilisateur._id,
            pseudo: utilisateur.pseudo,
            message: 'Connexion réussie'
        });

    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Une erreur est survenue, veuillez réessayer plus tard.' });
    }
};

const profil = async (req) => {
    const { id } = req.params;
    try {
        let utilisateur = await Utilisateur.findById(id);
        console.log(utilisateur)
        return utilisateur
    } catch (error) {
        throw error
    }
}

const deconnection = async (req, res) => {
    try {
        res.clearCookie("token")
    } catch (error) {
        throw error
    }
}



// const modifier = async (data) => {
//     try{
//         //comment savoir l'utilisateur connecté 
//         const modifierUtilisateur = await Utilisateur.findOneAndUpdate(utilisateur, data)
//         .then(() => console.log('User updated'))
//         .catch((err) => console.log(err));
//     }catch(error){
//         throw error
//     }

// }


// exports.update = async (req, res, next) => {
//     const temp   = {};

//     ({ 
//         name     : temp.name,
//         firstname: temp.firstname,
//         email    : temp.email,
//         password : temp.password
//     } = req.body);

//     try {
//         let user = await User.findOne({ email: temp.email });

//         if (user) {       
//             Object.keys(temp).forEach((key) => {
//                 if (!!temp[key]) {
//                     user[key] = temp[key];
//                 }
//             });

//             await user.save();
//             return res.status(201).json(user);
//         }

//         return res.status(404).json('user_not_found');
//     } catch (error) {console.log(error)
//         return res.status(501).json(error);
//     }
// }

// const deleteUtilisateur = async (req, res, next) => {
//     const { id } = req.body;
//     try {
//         await User.deleteOne({ _id: id });

//         return res.status(201).json('delete_ok');
//     } catch (error) {
//         return res.status(501).json(error);
//     }
// }




// Delete a user
// User.deleteOne({ name: 'Jane Doe' })
//   .then(() => console.log('User deleted'))
//   .catch((err) => console.log(err));

module.exports = {
    inscription,
    connection,
    profil,
    deconnection

}
