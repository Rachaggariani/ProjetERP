const connection = require('../../config/db');
if (!connection) {
    console.log("Database connection failed");
    process.exit(1);
  }

  const getdepot = () => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT * FROM depots';
      connection.query(sqlQuery, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };

  const getdepotById = (id) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT * FROM depots WHERE id=${id}`; // récupérer un depot par ID
      connection.query(sqlQuery, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]); // retourner la première ligne du résultat de la requête
        }
      });
    });
  };

  module.exports = {
    getdepotById,
    getdepot,
    
    
};
