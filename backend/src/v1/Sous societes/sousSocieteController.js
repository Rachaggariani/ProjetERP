const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const sousSocieteservice = require("./sousSocieteService");
const upload = require("../../Middlewares/uploadFile");

// Middleware for handling validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }
  next();
};

/**
 * @route   POST api/v1/sousSociete/add
 * @desc    save new sub-company
 * @access  Public
 */
router.post(
  "/add",
  [
    check("code", "code obligatoire!").not().isEmpty(),
    check("nom", "Nom obligatoire!").not().isEmpty(),
    check("societe_code", "Societe obligatoire!").not().isEmpty(),
    check("email", "Email non valide").isEmail(),
    check("matricule_fiscale", "Matricule fiscale obligatoire!")
      .not()
      .isEmpty(),
    check("telephone", "Telephone minimum 8  caractére").isLength({
      min: 8,
      max: 12,
    }),
    check("adresse", "Adresse obligatoire!").not().isEmpty(),
  ],
  handleValidationErrors, // Apply validation error handler middleware
  async (req, res) => {
    const {
      code,
      nom,
      adresse,
      matricule_fiscale,
      rc,
      code_postal,
      telephone,
      fax,
      email,
      societe_code,
      latitude,
      longitude,
      image,
    } = req.body;
    var data = {
      code,
      nom,
      adresse,
      matricule_fiscale,
      rc,
      code_postal,
      telephone,
      fax,
      email,
      societe_code,
      latitude,
      longitude,
      image,
    };
    const sousSociete = await sousSocieteservice.getSousSocieteByColumn(
      "code",
      code
    );
    if (sousSociete.success === true && sousSociete.data.length > 0) {
      return res.status(400).json({
        success: false,
        token: null,
        message: "Sous societe existe deja!!",
      });
    }
    try {
      const response = await sousSocieteservice.addSousSociete(data);
      console.log("response", response);
      res.json({
        status: 200,
        message: "Sous societe added successfully",
        data: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        token: null,
        message: "error fetching data!!",
        error: error.error,
      });
    }
  }
);

/**
 * @route   PUT api/v1/souSociete/update/:id
 * @desc    update sub-company
 * @access  Public
 */
router.put("/update/:id", async (req, res) => {
  try {
    const {
      code,
      nom,
      adresse,
      matricule_fiscale,
      rc,
      code_postal,
      telephone,
      fax,
      email,
      societe_code,
      latitude,
      longitude,
      image,
    } = req.body;
    var data = {
      code,
      nom,
      adresse,
      matricule_fiscale,
      rc,
      code_postal,
      telephone,
      fax,
      email,
      societe_code,
      latitude,
      longitude,
      image,
    };

    const idSousSociete = req.params.id;
    const result = await sousSocieteservice.updateSousSociete(
      data,
      idSousSociete
    );
    res.json({
      status: 200,
      message: "Sous societe updated successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

/**
 * @route   DELETE api/v1/sousSociete/:id
 * @desc    delete sub-company
 * @access  Public
 */
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await sousSocieteservice.deleteSousSociete(id);
    res.json({
      status: 200,
      message: "Sous societe deletd successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

/**
 * @route   GET api/v1/sousSociete
 * @desc    get all sub-companies
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const results = await sousSocieteservice.getSousSocietes();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

/**
 * @route   GET api/v1/sous societe/:id
 * @desc    get sub-company by id
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const sousSociete = await sousSocieteservice.getSousSocieteByColumn(
      "id",
      id
    );
    res.json(sousSociete);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});



router.post("/", upload.single("Images"), async (req, res) => {
  try {
    console.log("body----", req.body);
    const item = {
      ...req.body,
      file: req.file.filename,
    };
    console.log(" the item----", item);
    res.status(200).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

//get images from server
router.get("/:filename", function (req, res) {
  const { filename } = req.params;
  res.sendFile(`${__dirname}/src/v1/Images/${filename}`);
});
//
router.get('/:id', async (req, res) => {
  const soussociete = req.params.id; // obtenir l'id à partir de l'URL
  try {
    const s = await marqueService.getMarqueById(soussociete); // récupérer la marque par ID
    res.json(s);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
