const connection = require("../../config/db");
if (!connection) {
  console.log("Database connection failed");
  process.exit(1);
}
function generateRandomCode() {
  const characters = "0123456789";
  let code = "2-CMMAG VL";
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

const addCMD = async ({ CommercialRows, enteteCommercial }) => {
  console.log("comm code", CommercialRows);

  try {
    const code = generateRandomCode(); // generate a random code

    const enteteCommercialSql = `
      INSERT INTO entetecommercials (code, soussociete_code, client_nom, net_a_payer,grossiste_code, montant_total_ttc, client_code, remise, commercial_code, depot_code, created_at, updated_at, date,montant_total_ht) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW(),?)
    `;

    await new Promise((resolve, reject) => {
      connection.query(
        enteteCommercialSql,
        [
          code,
          enteteCommercial.soussociete_code,
          enteteCommercial.client_nom,
          enteteCommercial.net_a_payer,
          enteteCommercial.grossiste_code,
          enteteCommercial.montant_total_ttc,
          enteteCommercial.client_code,
          enteteCommercial.remise,
          enteteCommercial.commercial_code,
          enteteCommercial.depot_code,
          enteteCommercial.montant_total_ht,
        ],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    const ligneCommercialSql =
      "INSERT INTO lignecommercials (entetecommercial_code,produit_code, quantite, pu_ttc,pu_ht,p_tva, total_net, total, remise) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)";

    for (let i = 0; i < CommercialRows.length; i++) {
      const commercialRow = CommercialRows[i];

      console.log("commercial row", commercialRow);

      await new Promise((resolve, reject) => {
        connection.query(
          ligneCommercialSql,
          [
            code,
            commercialRow.produit_code,
            commercialRow.quantite,
            commercialRow.pu_ttc,
            commercialRow.pu_ht,
            commercialRow.p_tva,
            commercialRow.total_net,
            commercialRow.total,
            commercialRow.remise,
          ],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    }

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};


const getCMD = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM entetecommercials";
    connection.query(sqlQuery, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getCMDByID = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM entetecommercials WHERE commercial_code=?`; // récupérer une commande par ID
    connection.query(sqlQuery, [id], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows); // retourner la première une commande du résultat de la requête
      }
    });
  });
};
const removeCMD = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = 'DELETE FROM entetecommercials WHERE id=?';
    connection.query(sqlQuery, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
module.exports = {
  addCMD,
  getCMD,
  getCMDByID,
  removeCMD
};
