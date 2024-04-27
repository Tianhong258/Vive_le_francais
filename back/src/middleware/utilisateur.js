const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // vérifier l'utilisateur connecté est lui-même ou pas 
       const utilisateurId = decodedToken.utilisateurs_Id;
       req.auth = {
        utilisateurs_Id: utilisateurId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};