const connection = require('../../config/db');
if (!connection) {
    console.log("Database connection failed");
    process.exit(1);
  }
const getStocks = () => {
    return new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT * FROM stocks';
      connection.query(sqlQuery, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  const getstocksByID = (id) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT * FROM stocks WHERE commercial_code=?`;
      connection.query(sqlQuery,[id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };

module.exports = {
    getStocks,
    getstocksByID
    
};
