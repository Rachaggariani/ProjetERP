const dbCon = require("../../config/db");

/**
 *Add a new role
 * @param {Object} data - The data for the new role
 * @returns {Promise<Object>} - The new role data
 */

const addRole = async (data) => {
  const { code, libelle } = data;

  const sqlQuery = "INSERT INTO roles (code, libelle) VALUES (?, ?)";

  return new Promise((resolve, reject) => {
    dbCon.query(sqlQuery, [code, libelle], (error, rows) => {
      if (error) {
        reject({
          success: false,
          error: error.message,
        });
      } else {
        resolve(rows);
      }
    });
  });
};

/**
 *Get all roles
 * @returns {Promise<Object[]>} - The roles data.
 */
const getRole = () => {
  const sqlQuery = "SELECT * FROM roles";

  return new Promise((resolve, reject) => {
    dbCon.query(sqlQuery, (error, rows) => {
      if (error) {
        reject({
          success: false,
          error: error.message,
        });
      } else {
        resolve(rows);
      }
    });
  });
};

/**
 * Update an existing role.
 * @param {Object} data - The updated data for the role.
 * @param {number} id - The ID of the role to update.
 * @returns {Promise<Object>} - The updated role data.
 */
const updateRole = (data, id) => {
  const { code, libelle } = data;

  const sqlQuery = "UPDATE roles SET code=?, libelle=? WHERE id = ?";

  return new Promise((resolve, reject) => {
    dbCon.query(sqlQuery, [code, libelle, id], (error, rows) => {
      if (error) {
        reject({
          success: false,
          error: error.message,
        });
      } else {
        resolve(rows);
      }
    });
  });
};

/**
 * Delete an existing role.
 * @param {*} id - The ID of the role to delete.
 * @returns {Promise<Object>} - The deleted role data.
 *
 */

const deleteRole = (id) => {
  const sqlQuery = "DELETE FROM roles WHERE id=?";

  return new Promise((resolve, reject) => {
    dbCon.query(sqlQuery, [id], (error, rows) => {
      if (error) {
        reject({
          success: false,
          error: error.message,
        });
      } else {
        resolve(rows);
      }
    });
  });
};

/**
 * Get a role by searching for a specific column value.
 * @param {string} column - The column to search.
 * @param {string} value - The value to search for.
 * @returns {Promise<Object>} - The role data matching the search.
 */

const getRoleByColumn = async (column, value) => {
  const sqlQuery = `SELECT * FROM roles WHERE ${column} = ? LIMIT 1`;

  return new Promise((resolve, reject) => {
    dbCon.query(sqlQuery, [value], (error, rows) => {
      if (error) {
        reject({
          success: false,
          error: error.message,
        });
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  addRole,
  getRole,
  updateRole,
  deleteRole,
  getRoleByColumn,
};
