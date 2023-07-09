const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const categorieService = require('./categorieService');


/**
 * @route   POST api/v1/categories/add
 * @desc    save new categories
 * @access  Public
 */
router.post('/add',
[
    check('code', 'Code obligatoire!').not().isEmpty(),
    check('libelle', 'Libelle obligatoire!').not().isEmpty(),
    check('tarification', 'Tarification obligatoire!').not().isEmpty(),
],
 async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                token: null,
                message: errors.array()[0].msg
            })
        }

        const { code, libelle,tarification} = req.body;
        var data = { code, libelle,tarification};


        const categorie = await categorieService.getCategorieByColumn('code', code);
        if (categorie.success === true && categorie.data.length > 0) {
            return res.status(400).json({
                success: false,
                token: null,
                message: 'Categorie existe deja!!'
            })

        }


    try {
      
      const result = await categorieService.addCategorie(data);
      console.log(result);

      res.json({ status: 200, message: 'Categorie added successfully', data: result });
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  });


/**
 * @route   PUT api/v1/categories/update/:id
 * @desc    save new categorie
 * @access  Public
 */

router.put('/update/:id', async (req, res) => {
    try {
      const { code, libelle,tarification } = req.body;
      var data = { code, libelle,tarification};
      const idCategorie = req.params.id;
      const result = await categorieService.updateCategorie(data,idCategorie);
      res.json({ status: 200, message: 'Categorie updated successfully', data: result });
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  }); 




/**
 * @route   DELETE api/v1/categories/:id
 * @desc    delete categories
 * @access  Public
 */
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await categorieService.deleteCategorie(id);
      res.json({ status: 200, message: 'Categorie deletd successfully', data: result });
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  });




/**
 * @route   GET api/v1/categories
 * @desc    get all categories
 * @access  Public
 */  
  router.get('/', async (req, res) => {
    try {
      const results  = await categorieService.getCategorie();
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  });


/**
 * @route   GET api/v1/categories/:id
 * @desc    get categorie by id
 * @access  Public
 */ 

router.get('/:id', async (req, res) => {
    const idCategorie = req.params.id; 
    try {
      const role = await categorieService.getCategorieByColumn("id",idCategorie);
      res.json(role);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  });


module.exports = router ;