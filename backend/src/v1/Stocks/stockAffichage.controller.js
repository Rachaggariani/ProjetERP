const express = require("express");
const router = express.Router();
const stocksAfficheService = require("./stockAffichage.service");

router.get("/", async (req, res) => {
  try {
    const rows = await stocksAfficheService.getStocks();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  console.log("id",req.params)

  const { id } = req.params; // obtenir l'id à partir de l'URL
  try {
    const stock = await stocksAfficheService.getstocksByID(id); 
    res.json(stock);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
