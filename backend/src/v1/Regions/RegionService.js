const dbCon = require("../../config/db");



/**
 *Gets all regions from the database
 * @returns {Promise<Object[]>} - The regions data.
 *
 */
 const getRegions = () => {
    return new Promise((resolve, reject) => {
      const sqlQuery = "SELECT * FROM regions";
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
  

  module.exports = {
    getRegions
  };