const dbCon = require("../../config/db");
const { generateCode, newDateTime } = require('../../helpers/helpers');





/**
 * 
 * @param {*} data 
 * @returns new User 
 * 
 */
const addUser = async (data) => {

  const { code, code_a_barre,nom, email, login,password,prenom, matricule,cin, telephone, mobile,adresse, type_contrat,grade,type,pre_commande,role_code,societe_code,soussociete_code,isactif,only_my_data,vente_comptoir,salaire_base,cnss,enfant,numero_permis,categorie } = data;
  const g_code = code ? code : generateCode('U');
  const created_at = newDateTime();
  
  console.log(data);

  return new Promise((resolve, reject) => {
    dbCon.query(` INSERT INTO users (code, code_a_barre,nom,prenom, email, login,password, matricule,cin, telephone, mobile,adresse, type_contrat,grade,type,pre_commande,role_code,societe_code,soussociete_code,isactif,only_my_data,vente_comptoir,salaire_base,created_at,cnss,enfant,numero_permis,categorie) 
                     VALUES (?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? , ?, ?,?,?,?,?,?)`,
          [code, code_a_barre,nom,prenom, email, login,password, matricule,cin, telephone, mobile,adresse, type_contrat,grade,type,pre_commande,role_code,societe_code,soussociete_code,isactif,only_my_data,vente_comptoir,salaire_base,created_at,cnss,enfant,numero_permis,categorie],
          (error, rows) => {
              if (error) {
                  return reject({
                      success: false,
                      error: error.message
                  });
              }else{
                return resolve(rows);
              }

              
          });
  });
}



/**
 *
 * @returns Users
 *
 */
const getUser = () => {

  return new Promise((resolve, reject) => {

    const sqlQuery = "SELECT * FROM users";
    dbCon.query(sqlQuery, (error, rows) => {
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
 *
 * @param {*} data
 * @param {*} id
 * @returns  User updated
 *
 */
const updateUser = (data,id) => {
  const { code, code_a_barre,nom,prenom, email, login,password, matricule,cin, telephone, mobile,adresse, type_contrat,grade,type,pre_commande,role_code,societe_code,soussociete_code,photo,isactif,only_my_data,vente_comptoir } = data;
  
  
    console.log(data);

  return new Promise((resolve, reject) => {

    const sqlQuery ="UPDATE users SET code=?, code_a_barre =?, nom=?, prenom=?, email=?, login=?, password=?, matricule=?, cin=?, telephone=?, mobile=?, adresse=?, type_contrat =?, grade=?, type=?, pre_commande=?, role_code=?, societe_code=?, soussociete_code=?, photo=?, isactif=?, only_my_data=?, vente_comptoir=? WHERE id = ?";
    dbCon.query(sqlQuery,[code, code_a_barre,nom,prenom, email, login,password, matricule,cin, telephone, mobile,adresse, type_contrat,grade,type,pre_commande,role_code,societe_code,soussociete_code,photo,isactif,only_my_data,vente_comptoir,id],(error, rows) => {
        
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
 *
 * @param {*} id
 * @delete User by id
 *
 */

const deleteUser = (id) => {

  return new Promise((resolve, reject) => {

    const sqlQuery = "DELETE FROM users WHERE id=?";
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

/**
 *
 * @param {*} column
 * @param {*} value
 * @returns user by search column
 *
 */

const getUserByColumn = async (column, value) => {

  return new Promise((resolve, reject) => {
    
    const sqlQuery = ` 
                      SELECT * 
                      FROM users 
                      WHERE ${column} = ?
                      LIMIT 1
                      `;

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

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  getUserByColumn,
};
