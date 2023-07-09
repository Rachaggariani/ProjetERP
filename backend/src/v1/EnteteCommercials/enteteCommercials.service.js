const connection = require("../../config/db");
if (!connection) {
  console.log("Database connection failed");
  process.exit(1);
}
const addEntete = (
  code,
  code_commande,
  code_a_barre,
  facture_code,
  visite_code,
  type,
  envoi_cmd,
  societe_code,
  soussociete_code,
  commercial_code,
  user_code,
  creer_par,
  depot_code,
  client_code,
  caisse_code,
  grossiste_code,
  sended_to_grossiste,
  send_mails_cmds,
  client_nom,
  client_mobile,
  client_email,
  date,
  tax,
  taux_tva,
  timbre,
  mode_paiement,
  montant_retenue,
  montant_total_ht,
  montant_total_ttc,
  montant_total_tva,
  retenue_source,
  net_a_payer,
  net_a_payer_ht
) => {
  if (type && type.length > 50) {
    type = type.substring(0, 50);
  }

  return new Promise((resolve, reject) => {
    const CommercialCode = `SELECT d.libelle as camion, u.nom, u.prenom, u.code as commercial_code, d.code as depot_code
                                    FROM dist_test.users as u 
                                    LEFT JOIN dist_test.traces as t ON t.user_code = u.code 
                                    LEFT JOIN dist_test.depots as d ON t.depot_code = d.code 
                                    WHERE u.role_code = 'commercial'`;
    connection.query(CommercialCode, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const row = result[0]; // assuming the query returns only one row
        const entete =
          "INSERT INTO entetecommercials (code, code_commande, code_a_barre, facture_code, visite_code, type, envoi_cmd, societe_code, soussociete_code, commercial_code, user_code, creer_par, depot_code, client_code, caisse_code, grossiste_code, sended_to_grossiste, send_mails_cmds, client_nom, client_mobile, client_email, date, tax, taux_tva, timbre, mode_paiement, montant_retenue, montant_total_ht, montant_total_ttc, montant_total_tva, retenue_source, net_a_payer, net_a_payer_ht) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)";
        const typeValue = type || "";
        connection.query(
          entete,
          [
            code,
            code_commande,
            code_a_barre,
            facture_code,
            visite_code,
            typeValue,
            envoi_cmd,
            societe_code,
            soussociete_code,
            commercial_code,
            user_code,
            creer_par,
            depot_code,
            client_code,
            caisse_code,
            grossiste_code,
            sended_to_grossiste,
            send_mails_cmds,
            client_nom,
            client_mobile,
            client_email,
            date,
            tax,
            taux_tva,
            timbre,
            mode_paiement,
            montant_retenue,
            montant_total_ht,
            montant_total_ttc,
            montant_total_tva,
            retenue_source,
            net_a_payer,
            net_a_payer_ht,
            row.commercial_code,
            depot_code,
          ],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      }
    });
  });
};

const getEntete = () => {
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

const getEnteteByC = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM entetecommercials WHERE commercial_code=?`; // récupérer le fournisseur par ID
    connection.query(sqlQuery, [id], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0]); // retourner la première ligne du résultat de la requête
      }
    });
  });
};
const getEnteteByid = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM entetecommercials WHERE code=?`; // récupérer le client par ID
    connection.query(sqlQuery, [id], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0]); // retourner la première ligne du résultat de la requête
      }
    });
  });
};
// dans la partie clients chez maha 
const getClientByid = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM clients WHERE code=?`; // récupérer le clients par ID
    connection.query(sqlQuery, [id], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0]); // retourner la première ligne du résultat de la requête
      }
    });
  });
};

const getClientByUserid = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM clients WHERE user_code=?`; // récupérer le client par ID
    connection.query(sqlQuery, [id], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0]); // retourner la première ligne du résultat de la requête
      }
    });
  });
};


module.exports = {
  getEnteteByid,
  addEntete,
  getEntete,
  getEnteteByC,
  getClientByid,
  getClientByUserid,
  
};
