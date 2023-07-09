const dbCon = require("../../config/db");


/**
 *
 * @param {*} data
 * @returns new Client 
 *
 */

const addClient = async (data) => {

    const { code,code_a_barre,nom,prenom,cin,email,mobile,fixe,isactif,remise_client,categorie_statistique,magasin,activite_code,categorieCommerciale_code,code_erp,description,rib,regime_fiscale,rc,matricule_fiscale,adresse_facturation,adresse_livraison,latitude,longitude,route,region,zone,secteur,gouvernorat,delegation,localite,statut,autorisation,plafond_credit,autorisation_traite,plafond_traite,autorisation_cheque,plafond_cheque,passager,tarification,acces_metrage,soussociete_code,image,user_code  } = data;
    console.log(data);
    const sqlQuery = "INSERT INTO clients (code,code_a_barre,nom,prenom,cin,email,mobile,fixe,isactif,remise_client,categorie_statistique,magasin,activite_code,categoriecommercial_code,code_erp,description,rib,regime_fiscale,rc,matricule_fiscale,adresse_facturation,adresse_livraison,latitude,longitude,routing_code,region,zone,secteur,gouvernorat,delegation,localite,statut,autorisation,plafond_credit,autorisation_traite,plafond_credit_traite,autorisation_cheque,plafond_credit_cheque,passager,tarification,acces_metrage,soussociete_code,image,user_code ) VALUES (?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?)";

  return new Promise((resolve, reject) => {

    dbCon.query(sqlQuery, [code,code_a_barre,nom,prenom,cin,email,mobile,fixe,isactif,remise_client,categorie_statistique,magasin,activite_code,categorieCommerciale_code,code_erp,description,rib,regime_fiscale,rc,matricule_fiscale,adresse_facturation,adresse_livraison,latitude,longitude,route,region,zone,secteur,gouvernorat,delegation,localite,statut,autorisation,plafond_credit,autorisation_traite,plafond_traite,autorisation_cheque,plafond_cheque,passager,tarification,acces_metrage,soussociete_code,image,user_code ], (error, rows) => {
        if (error) {
            return reject({
              success: false,
              error: error.message,
            });
          }
    
          const response = {
            success: true,
            data: rows,
          };
          
          return resolve(response);
        });
  });
};

/**
 *
 * @returns Clients
 *
 */
const getClients = () => {

  return new Promise((resolve, reject) => {

    const sqlQuery = "SELECT * FROM clients";
    dbCon.query(sqlQuery, (error, rows) => {
        if (error) {
            return reject({
              success: false,
              error: error.message,
            });
          }else{
            resolve(rows)
          }
    
         
        });
  });
};

/**
 *
 * @param {*} data
 * @param {*} id
 * @returns  Client updated
 *
 */
const updateClient = (data,id) => {
    
    const { code,code_a_barre,nom,prenom,cin,email,mobile,fixe,isactif,remise_client,categorie_statistique,magasin,activite_code,categorieCommerciale_code,code_erp,description,rib,regime_fiscale,rc,matricule_fiscale,adresse_facturation,adresse_livraison,latitude,longitude,route,region,zone,secteur,gouvernorat,delegation,localite,statut,autorisation,plafond_credit,autorisation_traite,plafond_traite,autorisation_cheque,plafond_cheque,passager,tarification,acces_metrage,soussociete_code,image,user_code  } = data;
    console.log(data);

  return new Promise((resolve, reject) => {

    const sqlQuery ="UPDATE clients SET code=?, code_a_barre=?, nom=?, prenom=?, cin=?, email=?, mobile=?, fixe=?, isactif=?, remise_client=?, categorie_statistique=?, magasin=?, activite_code=?, categoriecommercial_code=?, code_erp=?, description=?, rib=?, regime_fiscale=?, rc=?, matricule_fiscale=?, adresse_facturation=?, adresse_livraison=?, latitude=?, longitude=?, routing_code=?, region=?, zone=?, secteur=?, gouvernorat=?, delegation=?, localite=?, statut=?, autorisation=?, plafond_credit=?, autorisation_traite=?, plafond_credit_traite=?, autorisation_cheque=?, plafond_credit_cheque=?, passager=?, tarification=?, acces_metrage=?, soussociete_code=?, image=?, user_code=? WHERE id = ?";
    dbCon.query(sqlQuery,[code,code_a_barre,nom,prenom,cin,email,mobile,fixe,isactif,remise_client,categorie_statistique,magasin,activite_code,categorieCommerciale_code,code_erp,description,rib,regime_fiscale,rc,matricule_fiscale,adresse_facturation,adresse_livraison,latitude,longitude,route,region,zone,secteur,gouvernorat,delegation,localite,statut,autorisation,plafond_credit,autorisation_traite,plafond_traite,autorisation_cheque,plafond_cheque,passager,tarification,acces_metrage,soussociete_code,image,user_code, id],(error, rows) => {
        
        if (error) {
            return reject({
              success: false,
              error: error.message,
            });
          }
    
          const response = {
            success: true,
            data: rows,
          };
          console.log(response);
          return resolve(response);
        });
  });
};

/**
 *
 * @param {*} id
 * @delete Client by id
 *
 */

const deleteClient = (id) => {

  return new Promise((resolve, reject) => {

    const sqlQuery = "DELETE FROM clients WHERE id=?";
    dbCon.query(sqlQuery, [id], (error, rows) => {
      if (error) {
        return reject({
          success: false,
          error: error.message,
        });
      }

      const response = {
        success: true,
        data: rows,
      };
      return resolve(response);
    
    });
  });
};

/**
 *
 * @param {*} column
 * @param {*} value
 * @returns Client by search column
 *
 */

const getClientByColumn = async (column, value) => {

  return new Promise((resolve, reject) => {
    
    const sqlQuery = ` 
                      SELECT * 
                      FROM clients 
                      WHERE ${column} = ?
                      LIMIT 1
                      `;

    dbCon.query(sqlQuery, [value], (error, rows) => {
      if (error) {
        return reject({
          success: false,
          error: error.message,
        });
      }

      const response = {
        success: true,
        data: rows,
      };
      return resolve(response);
    });
  });
};

module.exports = {
  addClient,
  getClients,
  updateClient,
  deleteClient,
  getClientByColumn,
};
