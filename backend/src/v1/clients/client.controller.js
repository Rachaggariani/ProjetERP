const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const ClientService = require('./clientService');


/**
 * @route   POST api/v1/clients/add
 * @desc    save new client
 * @access  Public
 */
router.post('/add',
[
    check('code', 'Code obligatoire!').not().isEmpty(),
    check('code_a_barre', 'Code a barre obligatoire!').not().isEmpty(),
    check('nom', 'Nom obligatoire!').not().isEmpty(),
    check('prenom', 'Prenom obligatoire!').not().isEmpty(),
    check('cin', 'CIN obligatoire!').not().isEmpty(),
    check('email', 'Email non valide').isEmail(),
    check('mobile', 'Le telephone doit avoir au minimum 8  caractére').isLength({ min: 8,max:12 }),
    check('isactif', 'Il faut inserer l etat du client !').not().isEmpty(),
    check('nom', 'Nom obligatoire!').not().isEmpty(),
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

        const { code,code_a_barre,nom,prenom,cin,email,mobile,fixe,isactif,remise_client,categorie_statistique,magasin,activite_code,categorieCommerciale_code,code_erp,description,rib,regime_fiscale,rc,matricule_fiscale,adresse_facturation,adresse_livraison,latitude,longitude,route,region,zone,secteur,gouvernorat,delegation,localite,statut,autorisation,plafond_credit,autorisation_traite,plafond_traite,autorisation_cheque,plafond_cheque,passager,tarification,acces_metrage,soussociete_code,image,user_code } = req.body;
        var data = { code,code_a_barre,nom,prenom,cin,email,mobile,fixe,isactif,remise_client,categorie_statistique,magasin,activite_code,categorieCommerciale_code,code_erp,description,rib,regime_fiscale,rc,matricule_fiscale,adresse_facturation,adresse_livraison,latitude,longitude,route,region,zone,secteur,gouvernorat,delegation,localite,statut,autorisation,plafond_credit,autorisation_traite,plafond_traite,autorisation_cheque,plafond_cheque,passager,tarification,acces_metrage,soussociete_code,image,user_code };


        const role = await ClientService.getClientByColumn('code', code);
        if (role.success === true && role.data.length > 0) {
            return res.status(400).json({
                success: false,
                token: null,
                message: 'Client existe deja!!'
            })

        }


    try {
      
      const result = await ClientService.addClient(data);
      console.log(result);

      res.json({ status: 200, message: 'Client added successfully', data: result });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  });


/**
 * @route   PUT api/v1/clients/update/:id
 * @desc    Change client attribute value
 * @access  Public
 */

router.put('/update/:id', async (req, res) => {
    try {
      const { code,code_a_barre,nom,prenom,cin,email,mobile,fixe,isactif,remise_client,categorie_statistique,magasin,activite_code,categorieCommerciale_code,code_erp,description,rib,regime_fiscale,rc,matricule_fiscale,adresse_facturation,adresse_livraison,latitude,longitude,route,region,zone,secteur,gouvernorat,delegation,localite,statut,autorisation,plafond_credit,autorisation_traite,plafond_traite,autorisation_cheque,plafond_cheque,passager,tarification,acces_metrage,soussociete_code,image,user_code  } = req.body;
      var data = { code,code_a_barre,nom,prenom,cin,email,mobile,fixe,isactif,remise_client,categorie_statistique,magasin,activite_code,categorieCommerciale_code,code_erp,description,rib,regime_fiscale,rc,matricule_fiscale,adresse_facturation,adresse_livraison,latitude,longitude,route,region,zone,secteur,gouvernorat,delegation,localite,statut,autorisation,plafond_credit,autorisation_traite,plafond_traite,autorisation_cheque,plafond_cheque,passager,tarification,acces_metrage,soussociete_code,image,user_code };
      const idClient = req.params.id;
      const result = await ClientService.updateClient(data,idClient);
      res.json({ status: 200, message: 'Client updated successfully', data: result });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }); 




/**
 * @route   DELETE api/v1/clients/:id
 * @desc    delete client
 * @access  Public
 */
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await ClientService.deleteClient(id);
      res.json({ status: 200, message: 'Clinet deleted successfully', data: result });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  });




/**
 * @route   GET api/v1/clients
 * @desc    get all clients
 * @access  Public
 */  
  router.get('/', async (req, res) => {
    try {
      const results  = await ClientService.getClients();
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  });


/**
 * @route   GET api/v1/clients/:id
 * @desc    get clients by id
 * @access  Public
 */ 

router.get('/:id', async (req, res) => {
    const idClient = req.params.id; 
    try {
      const role = await ClientService.getClientByColumn("id",idClient);
      res.json(role);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  });

module.exports = router ;