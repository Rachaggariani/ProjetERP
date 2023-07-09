const express = require("express");
const router = express.Router();
const depotService = require("./stockdepot.service");

router.post("/", async (req, res) => {
  try {
    const { code,soussociete_code,fournisseur_code,produit_code,colisage,qte_piece,qte_carton,val_achat,val_vente} = req.body;
    const result = await depotService.addDepot(code,soussociete_code,fournisseur_code,produit_code,colisage,qte_piece,qte_carton,val_achat,val_vente);
    res.json({
      status: 200,
      message: "Depot added successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const rows = await depotService.getDepot();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const {code,soussociete_code,fournisseur_code,produit_code,colisage,qte_piece,qte_carton,val_achat,val_vente} = req.body;
    console.log("code from depot controller", req.body);
    const id = req.params.id;
    const result = await depotService.updateDepot(id,code,soussociete_code,fournisseur_code,produit_code,colisage,qte_piece,qte_carton,val_achat,val_vente);
    res.json({
      status: 200,
      message: "Depot updated successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await depotService.removeDepot(id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params; // obtenir l'id à partir de l'URL
  try {
    const depot = await depotService.getDepotById(id); // récupérer la depot par ID
    res.json(depot);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
