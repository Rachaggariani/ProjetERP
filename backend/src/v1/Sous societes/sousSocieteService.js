const dbCon = require("../../config/db");
const { generateCode, newDateTime } = require("../../helpers/helpers");

/**
 * Adds new sub-company to the database
 * @param {*} data - An object containing sub-company data
 * @returns {Promise<Object>} - the new sub-company data
 *
 */
const addSousSociete = async (data) => {
  const {
    code,
    nom,
    adresse,
    matricule_fiscale,
    rc,
    code_postal,
    telephone,
    fax,
    email,
    societe_code,
    latitude,
    longitude,
    image,
  } = data;
  const g_code = code ? code : generateCode("U");
  const created_at = newDateTime();

  console.log(data);

  return new Promise((resolve, reject) => {
    dbCon.query(
      ` INSERT INTO soussocietes (code,nom,adresse,matricule_fiscale,rc,code_postal,telephone,fax, email,societe_code,latitude,longitude,image,created_at) 
                     VALUES ( ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
      [
        g_code,
        nom,
        adresse,
        matricule_fiscale,
        rc,
        code_postal,
        telephone,
        fax,
        email,
        societe_code,
        latitude,
        longitude,
        image,
        created_at
      ],
      (error, rows) => {
        if (error) {
          return reject({
            success: false,
            error: error.message,
          });
        } else {
          return resolve(rows);
        }
      }
    );
  });
};

/**
 *Gets all sub-companies from the database
 * @returns {Promise<Object[]>} - The sub-companies data.
 *
 */
const getSousSocietes = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM soussocietes";
    dbCon.query(sqlQuery, (error, rows) => {
      if (error) {
        return reject({
          success: false,
          error: error.message,
        });
      } else {
        return resolve(rows);
      }
    });
  });
};

/**
 * Updates a sub-company in the database
 * @param {*} data  - An object containing sub-company data
 * @param {*} id    - The ID of the sub-company to update
 * @returns  {Promise<Object>} - The updated sub-company data.
 *
 */
const updateSousSociete = (data, id) => {
  const {
    code,
    nom,
    adresse,
    matricule_fiscale,
    rc,
    code_postal,
    telephone,
    fax,
    email,
    societe_code,
    latitude,
    longitude,
    image,
  } = data;

  console.log(data);

  return new Promise((resolve, reject) => {
    const sqlQuery =
      "UPDATE soussocietes SET code=?, nom=?, adresse=?, matricule_fiscale=?, rc=?, code_postal=?, telephone=?, fax=?,  email=?, societe_code=?, latitude=?, longitude=?, image=? WHERE id = ?";
    dbCon.query(
      sqlQuery,
      [
        code,
        nom,
        adresse,
        matricule_fiscale,
        rc,
        code_postal,
        telephone,
        fax,
        email,
        societe_code,
        latitude,
        longitude,
        image,
        id,
      ],
      (error, rows) => {
        if (error) {
          return reject({
            success: false,
            error: error.message,
          });
        } else {
          return resolve(rows);
        }
      }
    );
  });
};

/**
 * Delete an existing sub-company.
 * @param {*} id - The ID of the sub-company to delete.
 * @returns {Promise<Object>} - The deleted sub-company data.
 *
 */
const deleteSousSociete = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "DELETE FROM soussocietes WHERE id=?";
    dbCon.query(sqlQuery, [id], (error, rows) => {
      if (error) {
        return reject({
          success: false,
          error: error.message,
        });
      } else {
        return resolve(rows);
      }
    });
  });
};

/**
 * Get a sub-company by searching for a specific column value.
 * @param {*} column - The column to search.
 * @param {*} value - The value to search for.
 * @returns {Promise<Object>} - The sub-company data matching the search.
 *
 */
const getSousSocieteByColumn = async (column, value) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = ` 
                      SELECT * 
                      FROM soussocietes 
                      WHERE ${column} = ?
                      LIMIT 1
                      `;

    dbCon.query(sqlQuery, [value], (error, rows) => {
      if (error) {
        return reject({
          success: false,
          error: error.message,
        });
      } else {
        return resolve(rows);
      }
    });
  });
};
const getSoussocieteById= (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM soussocietes WHERE id=${id}`; // récupérer la soussociete par ID
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
  addSousSociete,
  getSousSocietes,
  updateSousSociete,
  deleteSousSociete,
  getSousSocieteByColumn,
  getSoussocieteById,
};
