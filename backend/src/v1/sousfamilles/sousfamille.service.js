const connection = require('../../config/db');
if (!connection) {
    console.log("Database connection failed");
    process.exit(1);
  }
  const addSousfamille= (code,famille_code,libelle,ordre, prix_sousfamille_ht,prix_sousfamille_ttc) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'INSERT INTO sousfamilles (code,famille_code,libelle, ordre, prix_sousfamille_ht, prix_sousfamille_ttc) VALUES (?, ?, ?, ?, ?, ?)';
      connection.query(sqlQuery, [code,famille_code,libelle, ordre, prix_sousfamille_ht, prix_sousfamille_ttc], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

const getSousfamille = () => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT * FROM sousfamilles';
      connection.query(sqlQuery, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  const updateSousfamille = (id, code,famille_code, libelle,ordre, prix_sousfamille_ht,prix_sousfamille_ttc) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'UPDATE sousfamilles SET code=?, famille_code=?, libelle=?, ordre=?, prix_sousfamille_ht=?,prix_sousfamille_ttc=? WHERE id=?';
      connection.query(sqlQuery, [code,famille_code, libelle,ordre, prix_sousfamille_ht,prix_sousfamille_ttc, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  const removeSousfamille = (id) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'DELETE FROM sousfamilles WHERE id=?';
      connection.query(sqlQuery, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  const getSousfamilleById = (id) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT * FROM sousfamilles WHERE id=${id}`; // récupérer la sousfamille par ID
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
 addSousfamille,
 getSousfamille,
 updateSousfamille,
 removeSousfamille,
 getSousfamilleById
    
};
