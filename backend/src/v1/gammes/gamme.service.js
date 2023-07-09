const connection = require('../../config/db');// Import de la configuration de la base de données depuis le fichier '../../config/db'
// Vérification de la connexion à la base de données
if (!connection) {
  // Si la connexion échoue, affichage d'un message d'erreur dans la console
    console.log("Database connection failed");
    process.exit(1); // Arrêt du processus Node.js avec un code de sortie 1 (erreur)
  }
  // Définition d'une fonction asynchrone addGamme avec les paramètres code, libelle, color, image et ordre
  const addGamme = (code, libelle, color, image, ordre) => {
    return new Promise((resolve, reject) => {
       // Définition de la requête SQL d'insertion des données dans la table gammes
      const sqlQuery = 'INSERT INTO gammes (code, libelle, color, image, ordre) VALUES (?, ?, ?, ?, ?)';
        // Exécution de la requête SQL avec les valeurs des paramètres fournies
      connection.query(sqlQuery, [code, libelle, color, image, ordre], (err, result) => {
        if (err) {
            // Si une erreur se produit lors de l'exécution de la requête, la promesse est rejetée avec l'erreur
          reject(err);
        } else {
           // Si la requête s'exécute avec succès, la promesse est résolue avec le résultat
          resolve(result);
        }
      });
    });
  };
// c'est une requete qui permet de récupperer tous les données de la base de donnée Mysql 
const getGamme = () => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT * FROM gammes';
      connection.query(sqlQuery, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  // Définition d'une fonction updateGamme avec les paramètres id, code, libelle, color, image et ordre
  const updateGamme = (id, code, libelle, color, image, ordre) => {
    // Affichage du paramètre code dans la console
    console.log("code from gamme controller",code);

    return new Promise((resolve, reject) => {
      // Définition de la requête SQL de mise à jour des données dans la table gammes
      const sqlQuery = 'UPDATE gammes SET code=?, libelle=?, color=?, image=?, ordre=? WHERE id=?';
      // Exécution de la requête SQL avec les valeurs des paramètres fournies
      connection.query(sqlQuery, [code, libelle, color, image, ordre, id], (err, result) => {
        if (err) {
            // Si une erreur se produit lors de l'exécution de la requête, la promesse est rejetée avec l'erreur
          reject(err);
        } else {
           // Affichage du résultat de la requête dans la console
          console.log("result from service",result);
// Si la requête s'exécute avec succès, la promesse est résolue avec le résultat
          resolve(result);
        }
      });
    });
  };
  // Définition d'une fonction removeGamme avec le paramètre id
  const removeGamme = (id) => {
    return new Promise((resolve, reject) => {
       // Définition de la requête SQL de suppression des données dans la table gammes
      const sqlQuery = 'DELETE FROM gammes WHERE id=?';
        // Exécution de la requête SQL avec la valeur de l'identifiant fournie
      connection.query(sqlQuery, [id], (err, result) => {
        if (err) {
           // Si une erreur se produit lors de l'exécution de la requête, la promesse est rejetée avec l'erreur
          reject(err);
        } else {
            // Si la requête s'exécute avec succès, la promesse est résolue avec le résultat
          resolve(result);
        }
      });
    });
  };
  // requete de récuppération d'une gamme par ID
  const getGammeById = (id) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT * FROM gammes WHERE id=${id}`; // récupérer la gamme par ID
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
    addGamme,
    getGamme,
    updateGamme,
    removeGamme,
    getGammeById
    
};
