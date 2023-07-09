const connection = require("../../config/db");    
if (!connection) {
  console.log("Database connection failed");
  process.exit(1);
}
const getPoidParJour = () => {
  return new Promise((resolve, reject) => {
    const today = new Date().toISOString().slice(0, 10); // Get current date in "YYYY-MM-DD" format

    const sqlQueryProduits = `SELECT SUM(poids) AS poidsTotal FROM produits WHERE DATE(created_at) = '${today}'`;
    connection.query(sqlQueryProduits, (err, produitsResult) => {
      if (err) {
        reject(err);
      } else {
        const poidsTotal = produitsResult[0].poidsTotal || 0;

        const sqlQueryLignecommercials = "SELECT SUM(quantite) AS quantiteTotal FROM lignecommercials";
        connection.query(sqlQueryLignecommercials, (err, lignecommercialsResult) => {
          if (err) {
            reject(err);
          } else {
            const quantiteTotal = lignecommercialsResult[0].quantiteTotal || 0;
            const totalPoids = poidsTotal * quantiteTotal;
            resolve(totalPoids);
          }
        });
      }
    });
  });
};

const getPoidParMois = () => {
  return new Promise((resolve, reject) => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10); // Get the first day of the current month in "YYYY-MM-DD" format
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().slice(0, 10); // Get the last day of the current month in "YYYY-MM-DD" format

    const sqlQueryProduits = `SELECT SUM(poids) AS poidsTotal FROM produits WHERE created_at >= '${firstDayOfMonth}' AND created_at <= '${lastDayOfMonth}'`;
    connection.query(sqlQueryProduits, (err, produitsResult) => {
      if (err) {
        reject(err);
      } else {
        const poidsTotal = produitsResult[0].poidsTotal || 0;

        const sqlQueryLignecommercials = "SELECT SUM(quantite) AS quantiteTotal FROM lignecommercials";
        connection.query(sqlQueryLignecommercials, (err, lignecommercialsResult) => {
          if (err) {
            reject(err);
          } else {
            const quantiteTotal = lignecommercialsResult[0].quantiteTotal || 0;
            const totalPoids = poidsTotal * quantiteTotal;
            resolve(totalPoids);
          }
        });
      }
    });
  });
};

const getPoidParAnnee = () => {
  return new Promise((resolve, reject) => {
    const today = new Date();
    const currentYear = today.getFullYear();

    const sqlQueryProduits = `SELECT SUM(poids) AS poidsTotal FROM produits WHERE YEAR(created_at) = ${currentYear}`;
    connection.query(sqlQueryProduits, (err, produitsResult) => {
      if (err) {
        reject(err);
      } else {
        const poidsTotal = produitsResult[0].poidsTotal || 0;

        const sqlQueryLignecommercials = "SELECT SUM(quantite) AS quantiteTotal FROM lignecommercials";
        connection.query(sqlQueryLignecommercials, (err, lignecommercialsResult) => {
          if (err) {
            reject(err);
          } else {
            const quantiteTotal = lignecommercialsResult[0].quantiteTotal || 0;
            const totalPoids = poidsTotal * quantiteTotal;
            resolve(totalPoids);
          }
        });
      }
    });
  });
};

const getCountBl = () => {
  return new Promise((resolve, reject) => {
    const sqlQueryCount = "SELECT COUNT(*) AS count FROM entetecommercials";
    connection.query(sqlQueryCount, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const count = result[0].count;
        resolve(count);
      }
    });
  });
};

const getSumCredit = async () => {
  return new Promise((resolve, reject) => {
    const sqlQuerySum = "SELECT SUM(credit) AS somme_credit FROM paiements";
    connection.query(sqlQuerySum, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const sumCredit = result[0].somme_credit;
        resolve(sumCredit);
      }
    });
  });
};

const getSumEspece = async () => {
  return new Promise((resolve, reject) => {
    const sqlQuerySum = "SELECT SUM(espece) AS somme_espece FROM paiements";
    connection.query(sqlQuerySum, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const sumCredit = result[0].somme_espece;
        resolve(sumCredit);
      }
    });
  });
};


const getSumCheque = async () => {
  return new Promise((resolve, reject) => {
    const sqlQuerySum = "SELECT SUM(cheque) AS somme_cheque FROM paiements";
    connection.query(sqlQuerySum, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const sumCheque = result[0].somme_cheque;
        resolve(sumCheque);
      }
    });
  });
};
const getSumTraite = async () => {
  return new Promise((resolve, reject) => {
    const sqlQuerySum = "SELECT SUM(traite) AS somme_traite FROM paiements";
    connection.query(sqlQuerySum, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const sumTraite = result[0].somme_traite;
        resolve(sumTraite);
      }
    });
  });
};
const getKPIByDay = async () => {
  return new Promise((resolve, reject) => {
    const today = new Date().toISOString().split('T')[0];
    const sqlQuery = `SELECT SUM(net_a_paye) AS sum_net_a_paye, SUM(poids) AS sum_poid FROM entetecommercials WHERE DATE(created_at) = '${today}'`;
    connection.query(sqlQuery, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const { sum_net_a_paye, sum_poid } = result[0];
        resolve({ sum_net_a_paye, sum_poid });
      }
    });
  });
};


  
 
  module.exports = {
    getPoidParJour,
    getPoidParMois,
    getPoidParAnnee,
    getCountBl,
    getSumCredit,
    getSumEspece,
    getSumCheque,
    getSumTraite,
    getKPIByDay
  };
  