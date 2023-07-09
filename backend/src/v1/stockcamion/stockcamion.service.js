const connection = require('../../config/db');
if (!connection) {
    console.log("Database connection failed");
    process.exit(1);
  }
  const addCamion = (code, libelle,adresse,site_vente,type,max_bl,max_cmd,max_recouvrement,obligation_achat_avoir,sync_clients,avoir,Paiement_Esp,remise,autorisation_client,vente_credit,obligation_gps,soussociete_code,plafond_credit,version,colisage) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'INSERT INTO depots (code, libelle,adresse,site_vente,type,max_bl,max_cmd,max_recouvrement,obligation_achat_avoir,sync_clients,avoir,Paiement_Esp,remise,autorisation_client,vente_credit,obligation_gps,soussociete_code,plafond_credit,version,colisage) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
      connection.query(sqlQuery, [code,libelle,adresse,site_vente,type,max_bl,max_cmd,max_recouvrement,obligation_achat_avoir,sync_clients,avoir,Paiement_Esp,remise,autorisation_client,vente_credit,obligation_gps,soussociete_code,plafond_credit,version,colisage], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };


const getCamion = () => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT * FROM depots';
      connection.query(sqlQuery, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  const updateCamion = (id,code,libelle,adresse,site_vente,type,max_bl,max_cmd,max_recouvrement,obligation_achat_avoir,sync_clients,avoir,Paiement_Esp,remise,autorisation_client,vente_credit,obligation_gps,soussociete_code,plafond_credit,version,colisage) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'UPDATE depots SET code=?, libelle=?, adresse=?, site_vente=?, type=?, max_bl=?, max_cmd=?, max_recouvrement=?, obligation_achat_avoir=?, sync_clients=?, avoir=?, Paiement_Esp=?, remise=?, autorisation_client=?, vente_credit=?, obligation_gps=?, soussociete_code=?,plafond_credit=?,version=?,colisage=? WHERE id=?';
      connection.query(sqlQuery, [code,libelle,adresse,site_vente,type,max_bl,max_cmd,max_recouvrement,obligation_achat_avoir,sync_clients,avoir,Paiement_Esp,remise,autorisation_client,vente_credit,obligation_gps,soussociete_code,plafond_credit,version,colisage,id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  const removeCamion = async (id) => {
    return new Promise((resolve, reject) => {
      const sqlquery1='UPDATE depots SET soussociete_code = NULL WHERE soussociete_code =?';
      const sqlquery2='DELETE FROM routings WHERE depot_code = (SELECT code FROM depots WHERE id = 71);'
      const sqlQuery3 = 'DELETE FROM notes WHERE depot_code = (SELECT code FROM depots WHERE id = ?);';
      const sqlQuery4= 'DELETE FROM mouvement_clients WHERE id=?';
      const sqlquery5='UPDATE mouvement_clients SET depot_code = NULL WHERE depot_code =?';
      const sqlquery6='DELETE FROM mouvement_clients WHERE depot_code = (SELECT code FROM depots WHERE id = 71);'
      const sqlQuery7='DELETE FROM depots WHERE id=?';

      connection.promise().query(sqlquery1, [id])
        .then(() => connection.promise().query(sqlquery2, [id]))
        .then(() => connection.promise().query(sqlQuery3, [id]))
        .then(() => connection.promise().query(sqlQuery4, [id]))
        .then(() => connection.promise().query(sqlquery5, [id]))
        .then(() => connection.promise().query(sqlquery6, [id]))
        .then(() => connection.promise().query(sqlQuery7, [id]))
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
    
    
  };
  const getCamionById = (id) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT * FROM depots WHERE id=${id}`; // récupérer la camion par ID
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
    addCamion,
    getCamion,
    updateCamion,
    removeCamion,
    getCamionById
    
};
