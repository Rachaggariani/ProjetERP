const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const societeService = require('./societeService');
const upload = require("../../Middlewares/uploadFile")


/**
 * @route   PUT api/v1/societe/update/:id
 * @desc    update company
 * @access  Public
 */
router.put('/update/:id', async (req, res) => {
    try {
      const { code,nom,adresse, matricule_fiscale, telephone,fax, email,password,passwordAdmin, Pied_page, entete,prefix_bl, prefix_devis,prefix_commande,prefix_recouvrement,confirmation_annulation_entete,changement_prix,smsGratuite,jour_repos,image,rc,code_postal,Paiement_Esp,code_endouane,remise_espece,contrat,kilometrage,commande_stock,bloquage_commande,ajout_gratuite } = req.body;
      var data = { code,nom,adresse, matricule_fiscale, telephone,fax, email,password,passwordAdmin, Pied_page, entete,prefix_bl, prefix_devis,prefix_commande,prefix_recouvrement,confirmation_annulation_entete,changement_prix,smsGratuite,jour_repos,image,rc,code_postal,Paiement_Esp,code_endouane,remise_espece,contrat,kilometrage,commande_stock,bloquage_commande,ajout_gratuite};

      const id = req.params.id;
      const result = await societeService.updateSociete(data,id);
      res.json({ status: 200, message: 'Societe Updated successfully', data: result });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }); 

/**
 * @route   GET api/v1/societe
 * @desc    get all companies
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const results = await societeService.getSocietes();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

/**
 * @route   GET api/v1/societe/:id
 * @desc    get company by id
 * @access  Public
 */ 
router.get('/:id', async (req, res) => {
    const id = req.params.id; 
    try {
      const societe = await societeService.getSocieteByColumn("id",id);
      res.json(societe);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  });

/**
 * @route   DELETE api/v1/societe/:id
 * @desc    delete company
 * @access  Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await societeService.deleteSociete(id);
    res.json({ status: 200, message: 'Societe deletd successfully', data: result });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

  
router.post('/',upload.single('Images'),async (req, res) => {
  try {
    console.log("body----",req.body);
    const item = {
      ...req.body,
      file:req.file.filename
    };
    console.log(" the item----",item); 
    res.status(200).json(item) 
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});




//get images from server
router.get('/:filename', function(req,res){
  const {filename} = req.params
  res.sendFile(`${__dirname}/src/v1/Images/${filename}`);
});
//


module.exports = router ;