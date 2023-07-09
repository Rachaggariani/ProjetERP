const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const activiteService = require('./activiteService');


/**
 * @route   POST api/v1/activites/add
 * @desc    save new activite
 * @access  Public
 */
router.post('/add',
[
    check('code', 'Code obligatoire!').not().isEmpty(),
    check('libelle', 'Libelle obligatoire!').not().isEmpty(),
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

        const { code, libelle} = req.body;
        var data = { code, libelle};


        const activite = await activiteService.getActiviteByColumn('libelle', libelle);
        if (activite.success === true && activite.data.length > 0) {
            return res.status(400).json({
                success: false,
                token: null,
                message: 'Activite existe deja!!'
            })

        }


    try {
      
      const result = await activiteService.addActivite(data);
      console.log(result);

      res.json({ status: 200, message: 'Activite added successfully', data: result });
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  });


/**
 * @route   PUT api/v1/activites/update/:id
 * @desc    change activite
 * @access  Public
 */

router.put('/update/:id', async (req, res) => {
    try {
      const { code, libelle } = req.body;
      var data = { code, libelle};
      const idActivite = req.params.id;
      const result = await activiteService.updateActivite(data,idActivite);
      res.json({ status: 200, message: 'Activite updated successfully', data: result });
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  }); 




/**
 * @route   DELETE api/v1/activites/:id
 * @desc    delete activites
 * @access  Public
 */
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await activiteService.deleteActivite(id);
      res.json({ status: 200, message: 'Activite deletd successfully', data: result });
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  });




/**
 * @route   GET api/v1/activites
 * @desc    get all activites
 * @access  Public
 */  
  router.get('/', async (req, res) => {
    try {
      const results  = await activiteService.getActivite();
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  });


/**
 * @route   GET api/v1/activites/:id
 * @desc    get activite by id
 * @access  Public
 */ 

router.get('/:id', async (req, res) => {
    const idActivite = req.params.id; 
    try {
      const role = await activiteService.getActiviteByColumn("id",idActivite);
      res.json(role);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  });


module.exports = router ;