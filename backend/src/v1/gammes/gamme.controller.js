const express = require('express');// Import de la bibliothèque Express qui permet de créer des applications web
const router = express.Router();// Création d'un routeur Express pour gérer les routes spécifiques
const gammeService = require('./gamme.service');// Import du service gammeService qui contient la logique de gestion des gammes
const upload=require('../../Middlewares/uploadFile');// Import du middleware uploadFile qui gère le téléchargement de fichiers

// Définition de la route POST "/"
router.post('/',upload.single("images"), async (req, res) => {
  try {
      // Construction de l'URL de base en utilisant les variables d'environnement BASE_URL et PORT
    const baseURL= process.env.BASE_URL+process.env.PORT
     // Extraction des valeurs des champs "code", "libelle", "color" et "ordre" à partir du corps de la requête
    const { code, libelle, color,ordre } = req.body;
    // Récupération du nom du fichier téléchargé
    const image = req.file.filename;
    // Extraction du chemin relatif à partir du chemin absolu en enlevant la partie avant "src"
      // Remplacement des barres obliques inverses par des barres obliques dans le chemin du fichier
    const filePath = req.file.path.replace(/\\/g, "/"); // replace backslashes with forward slashes
    const relativePath = filePath.split("src")[1];   // Affichage du chemin relatif dans la console
    console.log("relative path",relativePath);// Affichage du chemin relatif dans la console
    const result = await gammeService.addGamme(code, libelle, color, baseURL+relativePath, ordre); // Appel de la fonction addGamme du service gammeService avec les paramètres fournis
    res.json({ status: 200, message: 'Gamme added successfully', data: result });// Envoi de la réponse JSON contenant un statut 200, un message de succès et les données résultantes
  } catch (err) {
     // En cas d'erreur, affichage de l'erreur dans la console et envoi d'une réponse avec un statut 500
    console.error(err);
    res.status(500).send(err);
  }
});
// Définition de la route GET() "/"
  router.get('/', async (req, res) => {
    try {
      const rows  = await gammeService.getGamme();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  
  // Définition de la route PUT() "/"
  router.put('/:id', async (req, res) => {
    try {
      // Extraction des valeurs des champs 'code', 'libelle', 'color', 'image' et 'ordre' du corps de la requête
      const { code, libelle, color, image, ordre } = req.body;
      // Affichage du champ 'code' du corps de la requête dans la console
      console.log("code from gamme controller",req.body);
      const id = req.params.id;// Extraction de l'identifiant de la gamme à partir des paramètres de la requête
      const result = await gammeService.updateGamme(id, code, libelle, color, image, ordre);// Appel de la fonction updateGamme du service gammeService avec les paramètres fournis
      res.json({ status: 200, message: 'Gamme updated successfully', data: result });// Envoi de la réponse JSON contenant un statut 200, un message de succès et les données résultantes
    } catch (err) {
       // En cas d'erreur, affichage de l'erreur dans la console et envoi d'une réponse avec un statut 500
      console.error(err);
      res.status(500).send(err);
    }
  }); 
  // Définition de la route DELETE() "/"
  router.delete('/:id', async (req, res) => {
    try {
      // Extraction de l'identifiant de la gamme à partir des paramètres de la requête
      const id = req.params.id;
       // Appel de la fonction removeGamme du service gammeService avec l'identifiant fourni
      const result = await gammeService.removeGamme(id);
       // Envoi de la réponse JSON contenant les données résultantes
      res.json(result);
    } catch (err) {
      // En cas d'erreur, affichage de l'erreur dans la console et envoi d'une réponse avec un statut 500
      console.error(err);
      res.status(500).send(err);
    }
  });
  // Définition de la route GETByID() "/"
  router.get('/:id', async (req, res) => {
    const {id} = req.params; // obtenir l'id à partir de l'URL
    try {
      const gamme = await gammeService.getGammeById(id); // récupérer la gamme par ID
      res.json(gamme);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  module.exports = router;