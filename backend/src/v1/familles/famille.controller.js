const express = require('express');
const router = express.Router();
const familleService = require('./famille.service');
const upload=require('../../Middlewares/uploadFile');
router.post('/',upload.single("images"),async (req, res) => {
  try {
    const baseURL= process.env.BASE_URL+process.env.PORT
    const { code, libelle,gamme_code,color, ordre } = req.body;
    const image = req.file.filename;
    const filePath = req.file.path.replace(/\\/g, "/"); // replace backslashes with forward slashes
    const relativePath = filePath.split("src")[1];  
    console.log("relative path",relativePath);
    const result = await familleService.addFamille(code, libelle,gamme_code, color, baseURL+relativePath, ordre);
    res.json({ status: 200, message: 'Famille added successfully', data: result });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
  router.get('/', async (req, res) => {
    try {
      const rows  = await familleService.getFamille();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  router.put('/:id', async (req, res) => {
    try {
      const { code, libelle, gamme_code, color, image, ordre } = req.body;
      const id = req.params.id;
      const result = await familleService.updateFamille(id, code, libelle, gamme_code, color, image, ordre);
      res.json({ status: 200, message: 'Famille updated successfully', data: result });
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await familleService.removeFamille(id);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  router.get('/:id', async (req, res) => {
    const familleId = req.params.id; // obtenir l'id à partir de l'URL
    try {
      const famille = await familleService.getFamilleById(familleId); // récupérer la famille par ID
      res.json(famille);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  module.exports = router;