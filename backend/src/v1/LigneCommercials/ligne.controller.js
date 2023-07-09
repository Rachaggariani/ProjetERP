const express = require('express');
const router = express.Router();
const ligneService = require('./ligne.service');
router.get('/', async (req, res) => {
    try {
      const rows  = await ligneService.getLigne();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  
  router.get('/:id', async (req, res) => {
    const ID = req.params.id; // obtenir l'id à partir de l'URL
    try {
      const BL = await ligneService.getLigneByBlCode(ID); // récupérer le fournisseur par ID
      res.json(BL);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });


  module.exports = router;