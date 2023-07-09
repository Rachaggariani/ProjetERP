const express = require('express');
const router = express.Router();
const marqueService = require('./marque.service');

// Gestion de la requête POST sur la route '/'
router.post('/', async (req, res) => {
  try {
     // Extraction des valeurs des champs 'code' et 'libelle' du corps de la requête
    const { code, libelle } = req.body;
     // Appel de la fonction addMarque du service marqueService avec les paramètres fournis
    const result = await marqueService.addMarque(code, libelle);
    // Envoi de la réponse JSON contenant un statut 200, un message de succès et les données résultantes
    res.json({ status: 200, message: 'Marque added successfully', data: result });
  } catch (err) {
      // En cas d'erreur, affichage de l'erreur dans la console et envoi d'une réponse avec un statut 500
    console.error(err);
    res.status(500).send(err);
  }
});
  router.get('/', async (req, res) => {
    try {
      const rows  = await marqueService.getMarque();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  
  // Gestion de la requête PUT sur la route '/:id'
  router.put('/:id', async (req, res) => {
    try {  
      // Extraction des valeurs des champs 'code' et 'libelle' du corps de la requête
      const { code, libelle } = req.body;
      const id = req.params.id; // Extraction de l'identifiant de la marque à partir des paramètres de la requête
      const result = await marqueService.updateMarque(id, code, libelle);// Appel de la fonction updateMarque du service marqueService avec les paramètres fournis
      res.json({ status: 200, message: 'Marque updated successfully', data: result }); // Envoi de la réponse JSON contenant un statut 200, un message de succès et les données résultantes
    } catch (err) {
      // En cas d'erreur, affichage de l'erreur dans la console et envoi d'une réponse avec un statut 500
      console.error(err);
      res.status(500).send(err);
    }
  }); 
  // Gestion de la requête DELETE sur la route '/:id'
  router.delete('/:id', async (req, res) => {
    try {
      // Extraction de l'identifiant de la marque à partir des paramètres de la requête
      const id = req.params.id;
       // Appel de la fonction removeMarque du service marqueService avec l'identifiant fourni
      const result = await marqueService.removeMarque(id);
      res.json(result);// Envoi de la réponse JSON contenant les données résultantes
    } catch (err) {
       // En cas d'erreur, affichage de l'erreur dans la console et envoi d'une réponse avec un statut 500
      console.error(err);
      res.status(500).send(err);
    }
  });
  router.get('/:id', async (req, res) => {
    const marqueId = req.params.id; // obtenir l'id à partir de l'URL
    try {
      const marque = await marqueService.getMarqueById(marqueId); // récupérer la marque par ID
      res.json(marque);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  module.exports = router;