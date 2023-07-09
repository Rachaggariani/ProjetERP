
const mysql = require('../../config/db');
const { generateCode, newDateTime } = require('../../helpers/helpers');
const _ = require('lodash');


/**
 * 
 * @param {*} column 
 * @param {*} value 
 * @returns user by search column
 */
const getUserByColumn = async (column, value) => {

    return new Promise((resolve, reject) => {
 // La requête SQL sélectionne toutes les colonnes de la table "users" où la colonne spécifiée correspond à la valeur donnée.
    // La clause "LIMIT 1" garantit que seule la première correspondance sera retournée.
        const sql = ` 
                    SELECT *
                    FROM users 
                    where ${column} = ? 
                    LIMIT 1
        `;
   // La méthode "mysql.query" exécute la requête SQL avec la valeur fournie en tant que paramètre pour la colonne spécifiée.
        mysql.query(sql, [value],
            (error, rows) => {
                if (error) {
                           // En cas d'erreur, la promesse est rejetée avec un objet contenant les détails de l'erreur.
                    return reject({
                        success: false,
                        error: error.message
                    });
                }
                        // Si la requête est réussie, un objet de réponse est créé avec les données retournées.
                const response = {
                    success: true,
                    data: rows
                }
                     // La promesse est résolue avec l'objet de réponse.
                return resolve(response);
            });
    });

}

/**
 * 
 * @param {*} data 
 * @returns new User inserted by local register
 * 
 */
//  Enregistrer un utilisateur
// Cette fonction asynchrone permet d'enregistrer un nouvel utilisateur dans la base de données.
// Elle prend un objet "data" contenant les informations de l'utilisateur à enregistrer.
// Les informations sont extraites de l'objet "data" et assignées à des variables individuelles pour une utilisation plus facile.
// Si la valeur "code" est fournie dans l'objet "data", elle est utilisée comme valeur du champ "code", sinon un code généré est utilisé.
// La date et l'heure de création sont également enregistrées en utilisant la fonction "newDateTime()".
// Les données extraites et les valeurs générées sont ensuite utilisées dans la requête SQL pour insérer une nouvelle ligne dans la table "users".
// En cas d'erreur lors de l'exécution de la requête, la promesse est rejetée avec un objet contenant les détails de l'erreur.
// Si la requête réussit, un objet de réponse est créé avec les informations de l'utilisateur enregistré, y compris l'identifiant de la ligne insérée et le code utilisé.
// La promesse est résolue avec l'objet de réponse.
const register = async (data) => {

    const { nom, prenom, matricule, adresse, login, password, email, telephone, mobile, equipe, code, code_a_barre, cin, salaire_base, type_contrat, cnss, role_code, enfant, famille, gamme, numero_permis, categorie } = data;
    const g_code = code ? code : generateCode('U');
    const created_at = newDateTime();
    
    console.log(data);

    return new Promise((resolve, reject) => {
        mysql.query(` INSERT INTO users (nom, prenom, matricule,adresse, login, password,email ,telephone, mobile, equipe, code, code_a_barre, cin, salaire_base, type_contrat, cnss, role_code , enfant , famille , gamme  , numero_permis, categorie,created_at) 
                       VALUES (?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? , ?, ?)`,
            [ nom, prenom, matricule,adresse,login,password, email, telephone, mobile,equipe, g_code, code_a_barre , cin ,salaire_base,type_contrat,cnss,role_code,enfant,famille,gamme,numero_permis,categorie,created_at],
            (error, rows) => {
                if (error) {
                    return reject({
                        success: false,
                        error: error.message
                    });
                }

                const response = {
                    success: true,
                    data: { ...data, id: rows.insertId, code: g_code }
                }
                return resolve(response);
            });
    });
}


/**
 * 
 * @param {*} data 
 * @returns new User inserted by local register
 * 
 */
const resetPass = async (data) => {

}


module.exports= {register,getUserByColumn}