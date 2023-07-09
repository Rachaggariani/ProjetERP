const connection = require("../../config/db");
if (!connection) {
  console.log("Database connection failed");
  process.exit(1);
}
function generateRandomCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "2-CMD-";
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}
const addBL = async ({ CommercialRows, Paiement, enteteCommercial }) => {
console.log("comm code", CommercialRows);

  try {
    const code = generateRandomCode(); // generate a random code

    const commercialCodeQuery = `
      SELECT d.libelle AS camion, u.nom, u.prenom, u.code AS commercial_code, d.code AS depot_code
      FROM dist_test.users AS u 
      LEFT JOIN dist_test.traces AS t ON t.user_code = u.code 
      LEFT JOIN dist_test.depots AS d ON t.depot_code = d.code 
      WHERE u.role_code='commercial' AND d.code=?
    `;

    const commercialCodeResult = await new Promise((resolve, reject) => {
      connection.query(
        commercialCodeQuery,
        [enteteCommercial.depot_code],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows[0]);
          }
        }
      );
    });

    const commercialCode = commercialCodeResult.commercial_code;

    const enteteCommercialSql = `
      INSERT INTO entetecommercials (code, timbre, soussociete_code, client_nom, net_a_payer, montant_total_ttc, client_code, remise, commercial_code, depot_code, created_at, updated_at, date) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())
    `;

    await new Promise((resolve, reject) => {
      connection.query(
        enteteCommercialSql,
        [
          code,
          enteteCommercial.timbre,
          enteteCommercial.soussociete_code,
          enteteCommercial.client_nom,
          enteteCommercial.net_a_payer,
          enteteCommercial.montant_total_ttc,
          enteteCommercial.client_code,
          enteteCommercial.remise,
          commercialCode,
          enteteCommercial.depot_code,
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
      "INSERT INTO lignecommercials (entetecommercial_code,produit_code, quantite, pu_ttc, total_net, total, remise) VALUES (?, ?, ?, ?, ?, ?, ?)";
    for (let i = 0; i < CommercialRows.length; i++) {
      const commercialRow = CommercialRows[i];

      console.log("comercial row", commercialRow);
      //let { produit_code } = commercialRow;
      //produit_code = "xx";

      await new Promise((resolve, reject) => {
        connection.query(
          ligneCommercialSql,
          [
            code,
            commercialRow.produit_code,
            commercialRow.quantite,
            commercialRow.pu_ttc,
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
console.log("Paiment IObject",Paiement);
    const paiementSql=`INSERT INTO paiements (espece,traite,cheque,num_cheque,num_traite,banque_traite,banque_cheque,credit,date_echeance_cheque,date_echeance_traite,date_echeance_credit,commentaire) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) `;
    await new Promise((resolve, reject) => {
      connection.query(
        paiementSql,
        [
          Paiement.espece,
          Paiement.cheque,
          Paiement.num_cheque,
          Paiement.banque_cheque,
          Paiement.traite,
          Paiement.num_traite,
          Paiement.banque_traite,
          Paiement.credit,
          new Date( Paiement.date_echeance_cheque),
          new Date(Paiement.date_echeance_traite),
          new Date(Paiement.date_echeance_credit),
          Paiement.commentaire,
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

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getBL = () => {
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

const getBLById = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM entetecommercials WHERE commercial_code=?`; // récupérer le bl par ID
    connection.query(sqlQuery, [id], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows); // retourner la première ligne du résultat de la requête
      }
    });
  });
};
const removeBL = (id) => {
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
  addBL,
  getBL,
  getBLById,
  removeBL
};
