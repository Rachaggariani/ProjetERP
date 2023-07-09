const express = require('express');
const router = express.Router();
const produitsService=require('./produit.service');
const upload=require('../../Middlewares/uploadFile');
router.post('/', upload.single("images"), async (req, res) => {
  try {
    const baseURL= process.env.BASE_URL+process.env.PORT;
    const {code, libelle, famille_code, sousfamille_code, marque_code, gamme_code, colisage, ordre, type,code_a_barre, prix_achat_ht, prix_achat_ttc, prix_ht,soussociete_code} = req.body;
    let image = '';
    let relativePath = '';
    if (req.file) {
      image = req.file.filename;
      const filePath = req.file.path.replace(/\\/g, "/"); // replace backslashes with forward slashes
      relativePath = filePath.split("src")[1];  
      console.log("relative path", relativePath);
    }
    const result = await produitsService.addProduct(code, libelle, famille_code, sousfamille_code, marque_code, gamme_code, colisage, ordre, baseURL + relativePath, type, code_a_barre, prix_achat_ht, prix_achat_ttc, prix_ht,soussociete_code);
    res.json({ status: 200, message: 'Product added successfully', data: result });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
  router.get('/', async (req, res) => {
    try {
      const rows  = await produitsService.getProducts();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  
  
  router.put('/:id', async (req, res) => {
    try {
      const {code, libelle,famille_code, sousfamille_code,marque_code,gamme_code,colisage,ordre, image,type,code_a_barre,prix_achat_ht,prix_achat_ttc,prix_ht,soussociete_code} = req.body;
      const id = req.params.id;
      const result = await produitsService.updateProduct(id,code, libelle,famille_code, sousfamille_code,marque_code,gamme_code,colisage,ordre, image,type,code_a_barre,prix_achat_ht,prix_achat_ttc,prix_ht,soussociete_code);
      res.json({ status: 200, message: 'Product updated successfully', data: result });
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }); 
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await produitsService.removeProduct(id);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  router.get('/:id', async (req, res) => {
    const ProductID = req.params.id; // obtenir l'id à partir de l'URL
    try {
      const produit = await produitsService. getProductById(ProductID); // récupérer produits par ID
      res.json(produit);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  module.exports = router;