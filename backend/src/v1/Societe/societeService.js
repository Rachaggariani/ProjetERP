const dbCon = require("../../config/db");

/**
 * Updates a company in the database
 * @param {*} data  - An object containing company data
 * @param {*} id    - The ID of the company to update
 * @returns  {Promise<Object>} - The updated company data.
 *
 */
const updateSociete = (data,id) => {
  const { code,nom,adresse, matricule_fiscale, telephone,fax, email,password,passwordAdmin, Pied_page, entete,prefix_bl, prefix_devis,prefix_commande,prefix_recouvrement,confirmation_annulation_entete,changement_prix,smsGratuite,jour_repos,image,rc,code_postal,Paiement_Esp,code_endouane,remise_espece,contrat,kilometrage,commande_stock,bloquage_commande,ajout_gratuite } = data;
    console.log(data);
    const sqlQuery ="UPDATE societes SET code=?, nom =?, adresse=?, matricule_fiscale=?, telephone=?, fax=?, email=?, password=?, passwordAdmin=?, Pied_page=?, entete=?, prefix_bl=?, prefix_devis =?, prefix_commande=?, prefix_recouvrement=?, confirmation_annulation_entete=?, changement_prix=?, smsGratuite=?, jour_repos=?, image=?, rc=?, code_postal=?, Paiement_Esp=?, code_endouane=?, remise_espece=?, contrat=?, kilometrage=?, commande_stock=?, bloquage_commande=?, ajout_gratuite=?   WHERE id = ?";
  return new Promise((resolve, reject) => {
    dbCon.query(sqlQuery,[code,nom,adresse, matricule_fiscale, telephone,fax, email,password,passwordAdmin, Pied_page, entete,prefix_bl, prefix_devis,prefix_commande,prefix_recouvrement,confirmation_annulation_entete,changement_prix,smsGratuite,jour_repos,image,rc,code_postal,Paiement_Esp,code_endouane,remise_espece,contrat,kilometrage,commande_stock,bloquage_commande,ajout_gratuite,id],(error, rows) => { 
        if (error) {
            return reject({
              success: false,
              error: error.message,
            });
          }else{
            return resolve(rows);
          }   
        });
  });
};


/**
 * Get a company by searching for a specific column value.
 * @param {*} column - The column to search.
 * @param {*} value - The value to search for.
 * @returns {Promise<Object>} - The company data matching the search.
 *
 */
const getSocieteByColumn = async (column, value) => {
  const sqlQuery = ` 
  SELECT * 
  FROM societes 
  WHERE ${column} = ?
  LIMIT 1
  `;
  return new Promise((resolve, reject) => {
    dbCon.query(sqlQuery, [value], (error, rows) => {
      if (error) {
        return reject({
          success: false,
          error: error.message,
        });
      }else{
        return resolve(rows);
      }

    });
  });
};

/**
 *Gets all sub-companies from the database
 * @returns {Promise<Object[]>} - The sub-companies data.
 *
 */
 const getSocietes = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM societes";
    dbCon.query(sqlQuery, (error, rows) => {
      if (error) {
        return reject({
          success: false,
          error: error.message,
        });
      } else {
        return resolve(rows);
      }
    });
  });
};



/**
 * Delete an existing company.
 * @param {*} id - The ID of the company to delete.
 * @returns {Promise<Object>} - The deleted company data.
 *
 */
const deleteSociete = (id) => {

  return new Promise((resolve, reject) => {

    const sqlQuery = "DELETE FROM societes WHERE id=?";
    dbCon.query(sqlQuery, [id], (error, rows) => {
      if (error) {
        return reject({
          success: false,
          error: error.message,
        });
      }else{
        return resolve(rows);
      }
    
    });
  });
};

module.exports = {
  updateSociete,
  getSocieteByColumn,
  deleteSociete,
  getSocietes
};
