const jwt = require('jsonwebtoken');
const cookie = require('cookie');
 
module.exports = (req, res, next) => {
       const cookies = cookie.parse(req.headers.cookie || '');
       const token = cookies.token;
       if (!token) {
        return res.status(401).json({ message: 'Non autorisé' });
       }
    try {
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const utilisateurId = decodedToken.utilisateurs_Id;
       req.auth = {
        utilisateurs_Id: utilisateurId
       }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalide' });
    }
}

