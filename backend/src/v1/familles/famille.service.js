const connection = require('../../config/db');
if (!connection) {
    console.log("Database connection failed");
    process.exit(1);
  }
  const addFamille = (code, libelle,gamme_code, color, image, ordre) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'INSERT INTO familles (code, libelle,gamme_code, color, image, ordre) VALUES (?, ?,?, ?, ?,?)';
      connection.query(sqlQuery, [code, libelle,gamme_code,color, image, ordre], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

const getFamille = () => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT * FROM familles';
      connection.query(sqlQuery, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  const updateFamille = (id, code, libelle, gamme_code, color, image, ordre) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = `UPDATE familles SET code = ?, libelle = ?, gamme_code = ?, color = ?, image = ?, ordre = ? WHERE id = ? `;
      const params = [code, libelle,gamme_code, color, image, ordre, id];
      connection.query(sqlQuery, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  
  const removeFamille = (id) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'DELETE FROM familles WHERE id=?';
      connection.query(sqlQuery, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  const getFamilleById = (id) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT * FROM familles WHERE id=${id}`; // récupérer la famille par ID
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
    addFamille,
    getFamille,
    updateFamille,
    removeFamille,
    getFamilleById
    
};
