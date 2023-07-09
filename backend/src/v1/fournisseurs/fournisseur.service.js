const connection = require('../../config/db');
if (!connection) {
    console.log("Database connection failed");
    process.exit(1);
  }
  const addFournisseur = (code, libelle,telephone,email,matricule_fiscale,contact,adresse,retenue) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'INSERT INTO fournisseurs (code, libelle,telephone,email,matricule_fiscale,contact,adresse,retenue) VALUES (?, ?,?,?,?,?,?,?)';
      connection.query(sqlQuery, [code, libelle,telephone,email,matricule_fiscale,contact,adresse,retenue], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

const getFournisseur = () => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT * FROM fournisseurs';
      connection.query(sqlQuery, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  const updateFournisseurs = (id, code, libelle,telephone,email,matricule_fiscale,contact,adresse,retenue) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'UPDATE fournisseurs SET code=?, libelle=?,telephone=?, email=?, matricule_fiscale=?, contact=?, adresse=?, retenue=? WHERE id=?';
      connection.query(sqlQuery, [code, libelle,telephone,email,matricule_fiscale,contact,adresse,retenue,id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  const removefournisseur = (id) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'DELETE FROM fournisseurs WHERE id=?';
      connection.query(sqlQuery, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  const getFournisseurById = (id) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT * FROM fournisseurs WHERE id=${id}`; // récupérer le fournisseur par ID
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
    addFournisseur,
    getFournisseur,
    updateFournisseurs,
    removefournisseur,
    getFournisseurById
    
};
