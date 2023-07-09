const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const roleService = require('./roleService');

// Middleware for handling validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg
    });
  }
  next();
};

/**
 * @route   POST api/v1/roles/add
 * @desc    save new role
 * @access  Public
 */
router.post('/add',
[
    check('code', 'Code obligatoire!').not().isEmpty(),
    check('libelle', 'Libelle obligatoire!').not().isEmpty(),
],handleValidationErrors,// Apply validation error handler middleware
 async (req, res) => {
    try {
      const { code, libelle} = req.body;
        // console.log("data of role",req.body);
        const data = { code, libelle};
        const role = await roleService.getRoleByColumn('code', code);
        if (role.success === true && role.data.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'role existe deja!!'
            })
        }
      const result = await roleService.addRole(data);
      // console.log(result);
      res.json({ status: 200, message: 'Role added successfully', data: result });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  });

/**
 * @route   PUT api/v1/roles/update/:id
 * @desc    update role by id
 * @access  Public
 */

router.put('/update/:id', async (req, res) => {
    try {
      const { code, libelle } = req.body;
      const data = { code, libelle};
      const idRole = req.params.id;
      const result = await roleService.updateRole(data,idRole);
      res.json({ status: 200, message: 'Role updated successfully', data: result });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }); 

/**
 * @route   DELETE api/v1/roles/:id
 * @desc    delete role by id
 * @access  Public
 */
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await roleService.deleteRole(id);
      res.json({ status: 200, message: 'Role deletd successfully', data: result });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  });

/**
 * @route   GET api/v1/roles
 * @desc    get all roles
 * @access  Public
 */  
  router.get('/', async (req, res) => {
    try {
      const results  = await roleService.getRole();
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  });


/**
 * @route   GET api/v1/roles/:id
 * @desc    get role by id
 * @access  Public
 */ 

router.get('/:id', async (req, res) => {
    const idRole = req.params.id; 
    try {
      const role = await roleService.getRoleByColumn("id",idRole);
      res.json(role);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  });

module.exports = router ;