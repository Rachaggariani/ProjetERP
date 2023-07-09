const express = require('express');
const router = express.Router();
const CMDService = require('./commande.service');
router.post('/', async (req, res) => {
  try {
    const result = await CMDService.addCMD(req.body);
    res.json({ status: 200, message: 'Commande added successfully', data: result });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

  router.get('/', async (req, res) => {
    try {
      const rows  = await CMDService.getCMD();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  
  router.get('/:id', async (req, res) => {
    const ID = req.params.id; // obtenir l'id à partir de l'URL
    try {
      const BL = await CMDService.getCMDByID(ID); // récupérer le fournisseur par ID
      res.json(BL);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await CMDService.removeCMD(id);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  module.exports = router;