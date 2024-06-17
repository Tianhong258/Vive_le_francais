const Utilisateur = require('./utilisateurSchema');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

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
        return newUtilisateur
    } catch (error) {
        throw error
    }
};


const connection = async (data, res) => {
    try {
        const utilisateur = await Utilisateur.findOne({ email: data.data.email })
        const validPassword = await bcrypt.compare(data.data.password, utilisateur.password);
        if (!validPassword || !utilisateur) {
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
            //maxAge: 24 * 60 * 60,
            maxAge: 24 * 60 * 60 * 1000, //24h
            sameSite: 'strict'
        });
        res.status(200).json({
            utilisateurs_Id: utilisateur._id,
            pseudo: utilisateur.pseudo,
            message: 'Connexion réussie'
        });
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue, veuillez réessayer plus tard.' });
    }
};

const profil = async (req) => {
    const { id } = req.params;
    try {
        let utilisateur = await Utilisateur.findById(id);
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


const modification = async (data, params) => {
    const hash = await bcrypt.hash(data.data.password, 10)
    const modifierUtilisateur = {
        pseudo: data.data.pseudo,
        email: data.data.email,
        password: hash,
    }
    try {
        let user = await Utilisateur.updateOne({ _id: params.id }, { ...modifierUtilisateur, _id: params.id })
        return user
    } catch (error) {
        throw error
    }
}

const deleteCompte = async (data) => {
    try {
        const compte = await Utilisateur.deleteOne({ _id: data.params.id })
        return compte;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    inscription,
    connection,
    profil,
    modification,
    deconnection,
    deleteCompte
}
