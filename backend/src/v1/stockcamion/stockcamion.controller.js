const express = require("express");
const router = express.Router();
const camionService = require("./stockcamion.service");

router.post("/", async (req, res) => {
  try {
    const {
      code,
      libelle,
      adresse,
      site_vente,
      type,
      max_bl,
      max_cmd,
      max_recouvrement,
      obligation_achat_avoir,
      sync_clients,
      avoir,
      Paiement_Esp,
      remise,
      autorisation_client,
      vente_credit,
      obligation_gps,
      plafond_credit,
      soussociete_code,
      version,
      colisage,
    } = req.body;
    const result = await camionService.addCamion(
      code,
      libelle,
      adresse,
      site_vente,
      type,
      max_bl,
      max_cmd,
      max_recouvrement,
      obligation_achat_avoir,
      sync_clients,
      avoir,
      Paiement_Esp,
      remise,
      autorisation_client,
      vente_credit,
      obligation_gps,
      plafond_credit,
      soussociete_code,
      version,
      colisage
    );
    res.json({
      status: 200,
      message: "Camion added successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const rows = await camionService.getCamion();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const {
      code,
      libelle,
      adresse,
      site_vente,
      type,
      max_bl,
      max_cmd,
      max_recouvrement,
      obligation_achat_avoir,
      sync_clients,
      avoir,
      Paiement_Esp,
      remise,
      autorisation_client,
      vente_credit,
      obligation_gps,
      soussociete_code,
      plafond_credit,
      version,
      colisage,
    } = req.body;
    console.log("code from camion controller", req.body);
    const id = req.params.id;
    const result = await camionService.updateCamion(
      id,
      code,
      libelle,
      adresse,
      site_vente,
      type,
      max_bl,
      max_cmd,
      max_recouvrement,
      obligation_achat_avoir,
      sync_clients,
      avoir,
      Paiement_Esp,
      remise,
      autorisation_client,
      vente_credit,
      obligation_gps,
      soussociete_code,
      plafond_credit,
      version,
      colisage
    );
    res.json({
      status: 200,
      message: "Camion updated successfully",
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
    const result = await camionService.removeCamion(id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params; // obtenir l'id à partir de l'URL
  try {
    const camion = await camionService.getCamionById(id); // récupérer la camion par ID
    res.json(camion);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
