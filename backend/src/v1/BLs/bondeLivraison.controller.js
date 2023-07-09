const express = require('express');
const router = express.Router();
const BLService = require('./bondeLivraison.service');
router.post('/', async (req, res) => {
  try {
    const result = await BLService.addBL(req.body);
    res.json({ status: 200, message: 'BL added successfully', data: result });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

  router.get('/', async (req, res) => {
    try {
      const rows  = await BLService.getBL();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  
  router.get('/:id', async (req, res) => {
    const ID = req.params.id; // obtenir l'id à partir de l'URL
    try {
      const BL = await BLService.getBLById(ID); // récupérer le fournisseur par ID
      res.json(BL);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await BLService.removeBL(id);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  module.exports = router;