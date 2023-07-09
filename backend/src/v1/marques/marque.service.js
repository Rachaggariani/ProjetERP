const connection = require('../../config/db');
if (!connection) {
    console.log("Database connection failed");
    process.exit(1);
  }
  const addMarque = (code, libelle) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'INSERT INTO marques (code, libelle) VALUES (?, ?)';
      connection.query(sqlQuery, [code, libelle], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

const getMarque = () => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT * FROM marques';
      connection.query(sqlQuery, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  const updateMarque = (id, code, libelle) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'UPDATE marques SET code=?, libelle=? WHERE id=?';
      connection.query(sqlQuery, [code, libelle,id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  const removeMarque = (id) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'DELETE FROM marques WHERE id=?';
      connection.query(sqlQuery, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  const getMarqueById = (id) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT * FROM marques WHERE id=${id}`; // récupérer la gamme par ID
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
    addMarque,
    getMarque,
    updateMarque,
    removeMarque,
    getMarqueById
    
};
