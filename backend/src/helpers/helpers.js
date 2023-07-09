//Ce fichier contient toutes les données prédéfinies qui facilitent la programmation et sont appelées helpers.

const moment = require('moment');
const os = require( 'os' );

function generateCode(prefix) {
  return prefix + '-' + moment().format('mmss');
}


function newDateTime() {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}

function newDate() {
  return moment().format('YYYY-MM-DD')
}


function getOS() {
  return os.networkInterfaces();
}
module.exports = {
  generateCode,
  newDateTime,
  newDate,
  getOS
}
