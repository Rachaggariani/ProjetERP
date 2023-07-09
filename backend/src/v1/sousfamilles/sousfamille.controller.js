const express = require('express');
const router = express.Router();
const sousfamillesService=require('./sousfamille.service');



router.post('/', async (req, res) => {
  try {
    const {code,famille_code,libelle,ordre, prix_sousfamille_ht,prix_sousfamille_ttc } = req.body;
    const result = await sousfamillesService.addSousfamille(code,famille_code, libelle,ordre, prix_sousfamille_ht,prix_sousfamille_ttc);
    res.json({ status: 200, message: 'Sous famille added successfully', data: result });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
  router.get('/', async (req, res) => {
    try {
      const rows  = await sousfamillesService.getSousfamille();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  
  
  router.put('/:id', async (req, res) => {
    try {
      console.log("sous famille ",req.body);
      const {code,famille_code, libelle,ordre, prix_sousfamille_ht,prix_sousfamille_ttc } = req.body;
      const id = req.params.id;
      console.log(id);
      const result = await sousfamillesService.updateSousfamille(id,code,famille_code, libelle,ordre, prix_sousfamille_ht,prix_sousfamille_ttc);
      res.json({ status: 200, message: 'Sous famille updated successfully', data: result });
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }); 
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await sousfamillesService.removeSousfamille(id);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  router.get('/:id', async (req, res) => {
    const {id} = req.params; // obtenir l'id à partir de l'URL
    try {
      const sousfamille = await sousfamillesService.getSousfamilleById(id); // récupérer de sous famille par ID
      res.json(sousfamille);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  module.exports = router;