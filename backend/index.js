
const express = require('express');
const dotenv = require('dotenv');
const connection = require('./src/config/db');
const jwt = require('jsonwebtoken');
const bodyParser=require('body-parser');
dotenv.config();


const gammeRouter=require('./src/v1/gammes/gamme.controller');
const marqueRouter=require('./src/v1/marques/marque.controller');
const familleRouter=require('./src/v1/familles/famille.controller');
const sousfamilleRouter=require('./src/v1/sousfamilles/sousfamille.controller');
const produitRouter=require('./src/v1/produits/produit.controller');
const fournisseurRouter=require('./src/v1/fournisseurs/fournisseur.controller');
const camionRouter=require('./src/v1/stockcamion/stockcamion.controller');
const depotRouter=require('./src/v1/StockDepot/stockdepot.controller');
const stocksRouter=require('./src/v1/Stocks/stockAffichage.controller');
const BLRouter=require('./src/v1/BLs/bondeLivraison.controller');
const commandeRouter=require('./src/v1/CMD/commande.controller');
const enteteRouter=require('./src/v1/EnteteCommercials/enteteCommercials.controller');
const ligneRouter=require('./src/v1/LigneCommercials/ligne.controller');
const RouterServiceDepot=require('./src/v1/depots/depot.controller');
const statistiqueService=require('./src/v1/Statistique/statistique.controller');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT 
// Handling Errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

app.get('/assets/:filename',(req,res)=>{
  const {filename}=req.params;
  res.sendFile(`${__dirname}/src/assets/${filename}`)
});
app.get('/', (req, res, next) => res.send(`🚀 Server running on port ${PORT}!`))
app.get('/api/v1', (req, res, next) => res.send(`🚀 Server running on port ${PORT}!`))
app.use('/api/v1/auth',require('./src/v1/auth/auth.controller'))
app.use('/api/v1/roles',require('./src/v1/roles/roleController'))
app.use('/api/v1/users',require('./src/v1/users/userController'))
app.use('/api/v1/categories',require('./src/v1/categories/categorieController'))
app.use('/api/v1/activites',require('./src/v1/activites/activiteController'))
app.use('/api/v1/clients',require('./src/v1/clients/client.controller'));
app.use('/api/v1/sousSocietes',require('./src/v1/Sous societes/sousSocieteController'));
app.use('/api/v1/gamme',gammeRouter);
app.use('/api/v1/marque',marqueRouter);
app.use('/api/v1/famille',familleRouter);
app.use('/api/v1/sousfamille',sousfamilleRouter);
app.use('/api/v1/produit',produitRouter);
app.use('/api/v1/fournisseur',fournisseurRouter);
app.use('/api/v1/stockcamion',camionRouter);
app.use('/api/v1/stockdepot',depotRouter);
app.use('/api/v1/detailsCamion',stocksRouter);
app.use('/api/v1/Entete',enteteRouter);
app.use('/api/v1/BL',BLRouter);
app.use('/api/v1/commande',commandeRouter);
app.use('/api/v1/Ligne',ligneRouter);
app.use('/api/v1/statistique',statistiqueService);
app.use('/api/v1/depot',RouterServiceDepot);
app.use(express.static(__dirname+"/src/assets"));
try {
    const server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
  }
