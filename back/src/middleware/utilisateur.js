const jwt = require('jsonwebtoken');
//const cookies = require('cookie');

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Non autorisé' });
    }
    console.log("token est " + token)
    try {
        const decodedToken = jwt.verify(token, 'vive-le-francais');
        console.log(decodedToken)
        const utilisateurId = decodedToken.utilisateurs_Id;
        const utilisateurPseudo = decodedToken.utilisateur.pseudo;
        req.auth = {
            utilisateurs_Id: utilisateurId,
            pseudo: utilisateurPseudo
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalide' });
    }
}

