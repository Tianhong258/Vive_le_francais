//Fichier qui lance le serveur
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
const vocabulaireRoute = require("./routes/vocabulaireRoute")


mongoose.connect('mongodb://localhost:27017/vive_le_français',
    {useNewUrlParser: true,
    useUnifiedTopology: true })
    mongoose.connection.on('connected', () => {
      console.log('Connexion à MongoDB réussie !');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('Connexion à MongoDB échouée ! Erreur :', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('Déconnexion de MongoDB');
    });

app.use(express.static("public"));

//middleware - gérer les CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
  });
  
//Middleware pour parser le JSON et utiliser le fichier JSON
app.use(express.json());
  
app.use("/api", vocabulaireRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});









