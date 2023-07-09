const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const userService = require('./userService');
const upload = require("../../Middlewares/uploadFile")



/**
 * @route   POST api/v1/users/add
 * @desc    save new user
 * @access  Public
 */
router.post('/add',
    [
        check('code', 'code obligatoire!').not().isEmpty(),
        check('code_a_barre', 'Code à barre obligatoire!').not().isEmpty(),
        check('nom', 'Nom obligatoire!').not().isEmpty(),
        check('prenom', 'Prenom obligatoire!').not().isEmpty(),
        check('email', 'Email non valide').isEmail(),
        check('login', 'Login non valide').isEmail(),
        check('password', 'Entrer un mot de passe de 6 caractére et plus ').isLength({ min: 6 }),
        check('matricule', 'Matricule obligatoire!').not().isEmpty(),
        check('cin', 'exactement 8 caractéres').isLength(8),
        check('telephone', 'Telephone minimum 8  caractére').isLength({ min: 8,max:12 }),
        check('mobile', 'Mobile minimum 8  caractére').isLength({ min: 8,max:12 }),
        check('adresse', 'Adresse obligatoire!').not().isEmpty(),
        // check('type_contrat', 'Type de contrat obligatoire!').not().isEmpty(),
        check('grade', 'Grade obligatoire!').not().isEmpty(),
        check('type', 'Type obligatoire!').not().isEmpty(),
        check('pre_commande', 'Quota obligatoire!').not().isEmpty(), 
        check('role_code', 'Role obligatoire!').not().isEmpty(),
        check('societe_code', 'Societe obligatoire!').not().isEmpty(),
        check('soussociete_code', 'Sous societe obligatoire!').not().isEmpty(),
        check('isactif', 'Etat obligatoire!').not().isEmpty(),
        check('only_my_data', 'Affichage des donnees obligatoire!').not().isEmpty(),
        check('vente_comptoir', 'Le champ vente comptoir est obligatoire!').not().isEmpty(),

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

        const { code, code_a_barre,nom,prenom, email, login,password, matricule,cin, telephone, mobile,adresse, type_contrat,grade,type,pre_commande,role_code,societe_code,soussociete_code,isactif,only_my_data,vente_comptoir,salaire_base,cnss,enfant,numero_permis,categorie } = req.body;
        var data = { code, code_a_barre,nom,prenom, email, login,password, matricule,cin, telephone, mobile,adresse, type_contrat,grade,type,pre_commande,role_code,societe_code,soussociete_code,isactif,only_my_data,vente_comptoir,salaire_base,cnss,enfant,numero_permis,categorie};


        const user = await userService.getUserByColumn('login', login);
        if (user.success === true && user.data.length > 0) {
            return res.status(400).json({
                success: false,
                token: null,
                message: 'user existe deja!!'
            })

        }
        try {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(password, salt);
            const response = await userService.addUser(data);
            console.log('response', response)
     

            
      
            res.json({ status: 200, message: 'User added successfully', data: response });
          }catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                token: null,
                message: 'error fetching data!!',
                error: error.error
            });
        }
    });






/**
 * @route   PUT api/v1/users/update/:id
 * @desc    update user
 * @access  Public
 */

router.put('/update/:id', async (req, res) => {
    try {
      const { code, code_a_barre,nom,prenom, email, login,password, matricule,cin, telephone, mobile,adresse, type_contrat,grade,type,pre_commande,role_code,societe_code,soussociete_code,photo,isactif,only_my_data,vente_comptoir,salaire_base,cnss,enfant,numero_permis,categorie } = req.body;
      var data = { code, code_a_barre,nom,prenom, email, login,password, matricule,cin, telephone, mobile,adresse, type_contrat,grade,type,pre_commande,role_code,societe_code,soussociete_code,photo,isactif,only_my_data,vente_comptoir,salaire_base,cnss,enfant,numero_permis,categorie};

      const idUser = req.params.id;
      const result = await userService.updateUser(data,idUser);
      res.json({ status: 200, message: 'User updated successfully', data: result });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }); 




/**
 * @route   DELETE api/v1/users/:id
 * @desc    delete User
 * @access  Public
 */
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await userService.deleteUser(id);
      res.json({ status: 200, message: 'User deletd successfully', data: result });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  });




/**
 * @route   GET api/v1/users
 * @desc    get all users
 * @access  Public
 */  
  router.get('/', async (req, res) => {
    try {
      const results  = await userService.getUser();
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  });


/**
 * @route   GET api/v1/users/:id
 * @desc    get user by id
 * @access  Public
 */ 

router.get('/:id', async (req, res) => {
    const idUser = req.params.id; 
    try {
      const user = await userService.getUserByColumn("id",idUser);
      res.json(user);
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