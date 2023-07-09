const connection = require('../../config/db');
if (!connection) {
    console.log("Database connection failed");
    process.exit(1);
  }
  const addProduct= (code, libelle,famille_code, sousfamille_code,marque_code,gamme_code,colisage,ordre, image,type,code_a_barre,prix_achat_ht,prix_achat_ttc,prix_ht,soussociete_code) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'INSERT INTO produits (code, libelle,famille_code, sousfamille_code,marque_code,gamme_code,colisage,ordre, image,type,code_a_barre,prix_achat_ht,prix_achat_ttc,prix_ht,soussociete_code) VALUES (?,?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?)';
      connection.query(sqlQuery, [code, libelle,famille_code, sousfamille_code,marque_code,gamme_code,colisage,ordre, image,type,code_a_barre,prix_achat_ht,prix_achat_ttc,prix_ht,soussociete_code], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

const getProducts = () => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT * FROM produits';
      connection.query(sqlQuery, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  const updateProduct = (id,code, libelle,famille_code, sousfamille_code,marque_code,gamme_code,colisage,ordre, image,type,code_a_barre,prix_achat_ht,prix_achat_ttc,prix_ht,soussociete_code) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'UPDATE produits SET code=?, libelle=?, famille_code=?, sousfamille_code=?,marque_code=?,gamme_code=?,colisage=?, ordre=?, image=?,type=?,code_a_barre=?,prix_achat_ht=?,prix_achat_ttc=?,prix_ht=?,soussociete_code=? WHERE id=?';
      connection.query(sqlQuery, [code, libelle,famille_code, sousfamille_code,marque_code,gamme_code,colisage,ordre, image,type,code_a_barre,prix_achat_ht,prix_achat_ttc,prix_ht,soussociete_code, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  const removeProduct = (id) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'DELETE FROM produits WHERE id=?';
      connection.query(sqlQuery, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  const getProductById = (id) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT * FROM produits WHERE id=${id}`; // récupérer le produit par ID
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
    addProduct,
    getProducts,
    updateProduct,
    removeProduct,
    getProductById
    
};
