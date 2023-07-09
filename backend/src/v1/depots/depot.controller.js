const express = require('express');
const router = express.Router();
const depotService = require('./depot.service');

router.get('/', async (req, res) => {
    try {
      const rows  = await depotService.getdepot();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  router.get('/:id', async (req, res) => {
    const depotid = req.params.id; // obtenir l'id à partir de l'URL
    try {
      const dpt = await depotService.getdepotById(depotid); // récupérer le depot par ID
      res.json(dpt);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  module.exports = router;