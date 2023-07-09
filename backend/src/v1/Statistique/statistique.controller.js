const express = require('express');
const router = express.Router();
const statistiqueService = require('./statistique.service');
router.get('/parJour', async (req, res) => {
    try {
      const rows  = await statistiqueService.getPoidParJour();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  router.get('/parMois', async (req, res) => {
    try {
      const rows  = await statistiqueService.getPoidParMois();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  router.get('/parAnnee', async (req, res) => {
    try {
      const rows  = await statistiqueService.getPoidParAnnee();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  router.get('/Bls', async (req, res) => {
    try {
      const rows  = await statistiqueService.getCountBl();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  
  router.get('/SumCredit',async(req,res)=>{
    try{
const rows=await statistiqueService.getSumCredit();
res.json(rows);
    }catch(err){
      console.error(err);
      res.status(500).send(err);
    }
  })

  router.get('/SumEspece',async(req,res)=>{
    try{
const rows=await statistiqueService.getSumEspece();
res.json(rows);
    }catch(err){
      console.error(err);
      res.status(500).send(err);
    }
  })

  router.get('/SumCheque',async(req,res)=>{
    try{
const rows=await statistiqueService.getSumCheque();
res.json(rows);
    }catch(err){
      console.error(err);
      res.status(500).send(err);
    }
  })

  router.get('/SumTraite',async(req,res)=>{
    try{
const rows=await statistiqueService.getSumTraite();
res.json(rows);
    }catch(err){
      console.error(err);
      res.status(500).send(err);
    }
  })
  
  


  module.exports = router;