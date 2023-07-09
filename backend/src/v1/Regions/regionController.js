const express = require("express");
const router = express.Router();
const regionService = require("./RegionService");

/**
 * @route   GET api/v1/regions
 * @desc    get all regions
 * @access  Public
 */
router.get("/", async (req, res) => {
    try {
      const results = await regionService.getRegions();
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  });

  module.exports = router;