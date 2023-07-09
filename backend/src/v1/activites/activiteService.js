const dbCon = require("../../config/db");


/**
 *
 * @param {*} data
 * @returns new Activite
 *
 */

const addActivite = async (data) => {

    const {code,libelle} = data;
    console.log(data);
    const sqlQuery = "INSERT INTO activites (code,libelle) VALUES (?,?)";

  return new Promise((resolve, reject) => {

    dbCon.query(sqlQuery, [code,libelle], (error, rows) => {
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
 * @returns Activites
 *
 */
const getActivite = () => {

  return new Promise((resolve, reject) => {

    const sqlQuery = "SELECT * FROM activites";
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
 * @returns  Activite updated
 *
 */
const updateActivite = (data,id) => {
    
    const {code,libelle} = data;
    console.log(data);

  return new Promise((resolve, reject) => {

    const sqlQuery ="UPDATE activites SET code=?, libelle=? WHERE id = ?";
    dbCon.query(sqlQuery,[code,libelle, id],(error, rows) => {
        
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
 * @param {*} id
 * @delete Activite by id
 *
 */

const deleteActivite = (id) => {

  return new Promise((resolve, reject) => {

    const sqlQuery = "DELETE FROM activites WHERE id=?";
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
 * @returns Activite by search column
 *
 */

const getActiviteByColumn = async (column, value) => {

  return new Promise((resolve, reject) => {
    
    const sqlQuery = ` 
                      SELECT * 
                      FROM activites 
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
  addActivite,
  getActivite,
  updateActivite,
  deleteActivite,
  getActiviteByColumn,
};
