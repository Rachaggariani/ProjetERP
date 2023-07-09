const express = require('express');
const router = express.Router();
const EnteteServices = require('./enteteCommercials.service');
router.post('/', async (req, res) => {
  try {
    const {soussociete_code,user_code,timbre,commercial_code,depot_code,client_nom,montant_total_ht,montant_total_ttc,net_a_payer} = req.body;
    const result = await EnteteServices.addEntete(soussociete_code,user_code,timbre,commercial_code,depot_code,client_nom,montant_total_ht,montant_total_ttc,net_a_payer);
    res.json({ status: 200, message: 'entete Commercial added successfully', data: result });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

  router.get('/', async (req, res) => {
    try {
      const rows  = await EnteteServices.getEntete();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  
  router.get('/:id', async (req, res) => {
    const ID = req.params.id; // obtenir l'id à partir de l'URL
    try {
      const BL = await EnteteServices.getEnteteByC(ID); // récupérer le fournisseur par ID
      res.json(BL);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  router.get('/code/:id', async (req, res) => {
    const ID = req.params.id; // obtenir l'id à partir de l'URL
    try {
      const BL = await EnteteServices.getEnteteByid(ID); // récupérer le fournisseur par ID
      res.json(BL);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  router.get('/client/:id', async (req, res) => {
    const ID = req.params.id; // obtenir l'id à partir de l'URL
    try {
      const cl= await EnteteServices.getClientByid(ID); // récupérer le fournisseur par ID
      res.json(cl);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  router.get('/clientByUser/:id', async (req, res) => {
    const ID = req.params.id; // obtenir l'id à partir de l'URL
    try {
      const cl= await EnteteServices.getClientByUserid(ID); // récupérer le fournisseur par ID
      res.json(cl);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  module.exports = router;