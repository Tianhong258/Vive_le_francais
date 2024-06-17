//Fichier qui lance le serveur
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
//Middleware pour parser le JSON et utiliser le fichier JSON
app.use(express.json());
const port = process.env.PORT || 3001;


const mongoose = require('mongoose');
const vocabulaireRoutes = require("./routes/vocabulaireRoutes")
const utilisateurRoutes = require("./routes/utilisateurRoutes")
var cors = require('cors');


mongoose.connect('mongodb://localhost:27017/vive_le_français',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
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



const origin = 'http://localhost:3000' || 'http://localhost:3001';

// Configuration de CORS
const corsOptions = {
  origin: origin,
  methods: 'GET, POST, PUT, PATCH, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", vocabulaireRoutes);
app.use("/api/auth", utilisateurRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});









