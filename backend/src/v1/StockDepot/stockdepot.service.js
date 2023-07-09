const connection = require('../../config/db');
if (!connection) {
    console.log("Database connection failed");
    process.exit(1);
  }
  const addDepot = (code,soussociete_code,fournisseur_code,produit_code,colisage,qte_piece,qte_carton,val_achat,val_vente) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'INSERT INTO stockdepots (code,soussociete_code,fournisseur_code,produit_code,colisage,qte_piece,qte_carton,val_achat,val_vente) VALUES (?,?,?,?,?,?,?,?,?)';
      connection.query(sqlQuery, [code,soussociete_code,fournisseur_code,produit_code,colisage,qte_piece,qte_carton,val_achat,val_vente], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

const getDepot = () => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT * FROM stockdepots';
      connection.query(sqlQuery, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  const updateDepot = (id, code, soussociete_code, fournisseur_code, produit_code, colisage, qte_piece, qte_carton, val_achat, val_vente) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'UPDATE stockdepots SET code=?, soussociete_code=?, fournisseur_code=?, produit_code=?, colisage=?, qte_piece=?, qte_carton=?, val_achat=?, val_vente=? WHERE id=?';
      connection.query(sqlQuery, [code, soussociete_code, fournisseur_code, produit_code, colisage, qte_piece, qte_carton, val_achat, val_vente, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  const removeDepot = (id) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'DELETE FROM stockdepots WHERE id=?';
      connection.query(sqlQuery, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  const getDepotById = (id) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT * FROM stockdepots WHERE id=${id}`; // récupérer la depot par ID
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
    addDepot,
    getDepot,
    updateDepot,
    removeDepot,
    getDepotById
    
};
