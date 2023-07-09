const connection = require("../../config/db");
if (!connection) {
  console.log("Database connection failed");
  process.exit(1);
}
const getLigne = () => {
    return new Promise((resolve, reject) => {
      const sqlQuery = "SELECT * FROM lignecommercials";
      connection.query(sqlQuery, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  
  const getLigneByBlCode = (ID) => {

    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT * FROM lignecommercials WHERE entetecommercial_code=?`; // récupérer le fournisseur par ID
      connection.query(sqlQuery, [ID], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows); // retourner la première ligne du résultat de la requête
        }
      });
    });
  };
  
  module.exports = {
    getLigne,
    getLigneByBlCode
  };
  