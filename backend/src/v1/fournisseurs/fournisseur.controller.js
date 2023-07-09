const express = require('express');
const router = express.Router();
const fournisseurService = require('./fournisseur.service');


router.post('/', async (req, res) => {
  try {
    const { code, libelle,telephone,email,matricule_fiscale,contact,adresse,retenue } = req.body;
    const result = await fournisseurService.addFournisseur(code, libelle,telephone,email,matricule_fiscale,contact,adresse,retenue);
    res.json({ status: 200, message: 'fournisseur added successfully', data: result });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
  router.get('/', async (req, res) => {
    try {
      const rows  = await fournisseurService.getFournisseur();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  
  
  router.put('/:id', async (req, res) => {
    try {
      const { code, libelle,telephone,email,matricule_fiscale,contact,adresse,retenue } = req.body;
      const id = req.params.id;
      const result = await fournisseurService.updateFournisseurs(id, code, libelle,telephone,email,matricule_fiscale,contact,adresse,retenue);
      res.json({ status: 200, message: 'Fournisseur updated successfully', data: result });
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }); 
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await fournisseurService.removefournisseur(id);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  router.get('/:id', async (req, res) => {
    const fournisseurId = req.params.id; // obtenir l'id à partir de l'URL
    try {
      const fournisseur = await fournisseurService.getFournisseurById(fournisseurId); // récupérer le fournisseur par ID
      res.json(fournisseur);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  module.exports = router;