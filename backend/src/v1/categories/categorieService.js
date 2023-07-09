const dbCon = require("../../config/db");


/**
 *
 * @param {*} data
 * @returns new Categorie
 *
 */

const addCategorie = async (data) => {
    const {code,libelle,tarification} = data;
    console.log(data);
    const sqlQuery = "INSERT INTO categoriecommercials (code,libelle,tarification) VALUES (?,?,?)";

  return new Promise((resolve, reject) => {
    dbCon.query(sqlQuery, [code,libelle,tarification], (error, rows) => {
        if (error) {
            return reject({
              success: false,
              error: error.message,
            });
          }else{
            resolve(rows);
          }
                            });
  });
};

/**
 *
 * @returns Categorie
 *
 */
const getCategorie = () => {
  const sqlQuery = "SELECT * FROM categoriecommercials";

  return new Promise((resolve, reject) => {
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
 * @returns  Categorie updated
 *
 */
const updateCategorie = (data,id) => {
    
    const {code,libelle,tarification} = data;
    console.log(data);
    const sqlQuery ="UPDATE categoriecommercials SET code=?, libelle=?,tarification=? WHERE id = ?";
  return new Promise((resolve, reject) => {
    dbCon.query(sqlQuery,[code,libelle,tarification, id],(error, rows) => {  
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
 * @delete Categorie by id
 *
 */

const deleteCategorie = (id) => {
  const sqlQuery = "DELETE FROM categoriecommercials WHERE id=?"; 

  return new Promise((resolve, reject) => { 
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
 * @returns Categorie by search column
 *
 */

const getCategorieByColumn = async (column, value) => {
  const sqlQuery = ` 
  SELECT * 
  FROM categoriecommercials 
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

module.exports = {
  addCategorie,
  getCategorie,
  updateCategorie,
  deleteCategorie,
  getCategorieByColumn,
};
