// express est utilisé pour créer une application web et définir des routes.
const express = require("express");
//  Utilisé pour définir des routes dans l'application
const router = express.Router();
// Bibliothèque pour valider les données envoyées via les requêtes HTTP
const { check, validationResult } = require("express-validator");
// Bibliothèque pour envoyer des e-mails depuis l'application
const nodemailer = require("nodemailer");
//  Bibliothèque pour le chiffrement des mots de passe
const bcrypt = require("bcryptjs");
// Bibliothèque pour générer et vérifier les JSON Web Tokens (JWT)
const jwt = require("jsonwebtoken");
// Bibliothèque pour générer des codes OTP (One-Time Passwords)
const otpGenerator = require("otp-generator");
// Bibliothèque pour charger les variables d'environnement depuis un fichier .env
const dotenv = require("dotenv");
dotenv.config();// Chargement des variables d'environnement
//  Service d'authentification personnalisé
const authService = require("./auth.service");
// Bibliothèque pour générer des codes OTP (One-Time Passwords)
const optGenarator = require("otp-generator");
// Configuration de la connexion à la base de données MySQL
const connection = require("../../config/db");
/**
 * @route   POST api/v1/register
 * @desc    save new user
 * @access  Public
 */
router.post(
  "/register",
  [
    check("nom", "Nom obligatoire!").not().isEmpty(),
    check("prenom", "Prenom obligatoire!").not().isEmpty(),
    check("type_contrat", "type de contrat obligatoire!").not().isEmpty(),
    check("matricule", "matricule obligatoire!").not().isEmpty(),
    check("adresse", "adresse obligatoire!").not().isEmpty(),
    check("login", "Email non valide").isEmail(),
    check("equipe", "equipe obligatoire!").not().isEmpty(),
    check("code", "code obligatoire!").not().isEmpty(),
    check("code_a_barre", "code à barre obligatoire!").not().isEmpty(),
    check("cin", "exactement 8 caractéres").isLength(8),
    check("email", "Email non valide").isEmail(),
    check(
      "password",
      "entrer un mot de passe de 6 caractére et plus "
    ).isLength({ min: 6 }),
    check("telephone", "telephone minimum 8  caractére").isLength({
      min: 8,
      max: 12,
    }),
    check("mobile", "mobile minimum 8  caractére").isLength({
      min: 8,
      max: 12,
    }),
    check("cnss", "cnss obligatoire!").not().isEmpty(),
    check("role_code", "role code obligatoire!").not().isEmpty(),
    check("enfant", "champ enfant obligatoire!").not().isEmpty(),
    check("famille", "champ famille obligatoire!").not().isEmpty(),
    check("gamme", "champ gamme obligatoire!").not().isEmpty(),
  ],
  // Inscription d'un utilisateur avec validation des données et génération d'un token JWT.
  async (req, res) => {
     // Importation de la fonction `validationResult` pour valider les données de la requête
    const errors = validationResult(req);
     // Vérification s'il y a des erreurs dans la validation des données
    if (!errors.isEmpty()) {
      // Si des erreurs sont présentes, renvoyer une réponse JSON avec le code d'état 400 (Bad Request)
    // et un message décrivant la première erreur
      return res.status(400).json({
        success: false,
        token: null,
        message: errors.array()[0].msg,
      });
    }

    const {
      nom,
      prenom,
      matricule,
      adresse,
      login,
      password,
      email,
      telephone,
      mobile,
      equipe,
      code,
      code_a_barre,
      cin,
      type_contrat,
      cnss,
      role_code,
      enfant,
      famille,
      gamme,
      numero_permis,
      categorie,
      salaire_base,
    } = req.body;
    // Création d'un objet `data` contenant les données extraites
    var data = {
      nom,
      prenom,
      matricule,
      adresse,
      login,
      password,
      email,
      telephone,
      mobile,
      equipe,
      code,
      code_a_barre,
      cin,
      type_contrat,
      cnss,
      role_code,
      enfant,
      famille,
      gamme,
      numero_permis,
      categorie,
      salaire_base,
    };
// Vérification si un utilisateur existe déjà avec l'adresse e-mail fournie
    const user = await authService.getUserByColumn("email", email);
    if (user.success === true && user.data.length > 0) {
       // Si un utilisateur existe, renvoyer une réponse JSON avec le code d'état 400 (Bad Request)
    // et un message indiquant que l'utilisateur existe déjà
      return res.status(400).json({
        success: false,
        token: null,
        message: "user existe deja!!",
      });
    }
    try {
      // Génération d'un sel (salt) pour le chiffrement du mot de passe
      const salt = await bcrypt.genSalt(10);
      // Hachage du mot de passe avec le sel généré
      data.password = await bcrypt.hash(password, salt);
       // Appel de la fonction `register` de `authService` avec les données de l'utilisateur
      const response = await authService.register(data);
      console.log("response", response);
// Création d'un payload pour le token JWT contenant les informations de l'utilisateur
      const payload = {
        user: {
          id: response.data.id,
          nom: response.data.nom,
          prenom: response.data.prenom,
          matricule: response.data.matricule,
          adresse: response.data.adresse,
          login: response.data.login,
          password: response.data.password,
          email: response.data.email,
          telephone: response.data.telephone,
          mobile: response.data.mobile,
          equipe: response.data.equipe,
          code: response.data.code,
          code_a_barre: response.data.code_a_barre,
          cin: response.data.cin,
          salaire_base: response.data.salaire_base,
          type_contrat: response.data.type_contrat,
          cnss: response.data.cnss,
          role_code: response.data.role_code,
          enfant: response.data.enfant,
          famille: response.data.famille,
          gamme: response.data.gamme,
          numero_permis: response.data.numero_permis,
          categorie: response.data.categorie,
        },
      };
  // Signature du token JWT avec une clé secrète, une expiration de 360000 secondes (100 heures),
    // et renvoi du token dans une réponse JSON avec le code d'état 200 (OK)
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({
            success: true,
            token,
          });
        }
      );
    } catch (error) {
       // En cas d'erreur, renvoyer une réponse JSON avec le code d'état 500 (Internal Server Error)
    // et un message d'erreur générique
      console.log(error);
      return res.status(500).json({
        success: false,
        token: null,
        message: "error fetching data!!",
        error: error.error,
      });
    }
  }
);

/**
 * @route   POST api/v1/login
 * @desc    login user
 * @access  Public
 */
router.post(
  "/login",
  [
    check("email", "Please enter your email").not().isEmpty(),
    check("email", "Invalid email").isEmail(),

    check("password", "Please enter your password").not().isEmpty(),
  ],
  // Handler pour une requête asynchrone (utilisant async/await)
  async (req, res) => {
    const errors = validationResult(req);// Validation des erreurs de la requête
    if (!errors.isEmpty()) {
        // Si des erreurs sont présentes
      return res.status(400).json({
        success: false,
        token: null,
        message: errors.array()[0].msg,// Renvoie le message d'erreur associé à la première erreur
      });
    }
    const { email, password } = req.body;// Extraction des données email et password du corps de la requête

    try {
      var user = await authService.getUserByColumn("login", email);// Récupération de l'utilisateur par son email (login)
      if (user.success === true && user.data.length === 0) {
         // Si la recherche de l'utilisateur a réussi mais aucun utilisateur n'a été trouvé
        return res.status(400).json({
          success: false,
          token: null,
          message: "User doesn't exist",// Renvoie un message d'erreur indiquant que l'utilisateur n'existe pas
        });
      }
      user = user.data[0]; // Sélection du premier utilisateur trouvé (supposant que l'email est unique)
      const isMatch = await bcrypt.compare(password, user.password);// Vérification de la correspondance du mot de passe fourni avec le mot de passe enregistré dans la base de données

      if (!isMatch) {
          // Si les mots de passe ne correspondent pas
        return res.status(400).json({ message: " Invalid credentials" });
      }

      const payload = {
         // Préparation des données à inclure dans le jeton JWT
        user: {
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          matricule: user.matricule,
          adresse: user.adresse,
          login: user.login,
          password: user.password,
          email: user.email,
          telephone: user.telephone,
          mobile: user.mobile,
          equipe: user.equipe,
          code: user.code,
          code_barre: user.code_barre,
          cin: user.cin,
          type_contrat: user.type_contrat,
        },
      };

      jwt.sign(
         // Création du jeton JWT avec les données de l'utilisateur
        payload,
        process.env.JWT_SECRET,// Utilisation de la clé secrète JWT stockée dans la variable d'environnement
        { expiresIn: 360000 },// Configuration de l'expiration du jeton (ici, 360000 ms soit 6 minutes)
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({
            success: true,
            token,// Renvoie le jeton JWT généré
            result: user,// Renvoie les informations de l'utilisateur
          });
        }
      );
    } catch (error) {
      // En cas d'erreur lors de l'exécution du code cidessus
      return res.status(500).json({
        success: false,
        token: null,
        message: "Something went wrong!!", // Renvoie un message d'erreur générique indiquant qu'il y a eu un problème
        error: error.error, // Renvoie l'erreur spécifique qui s'est produite
      });
    }
  }
);

// Page forgot password
// Route pour la demande de réinitialisation de mot de passe
router.post("/forgetPassword", (req, res) => {
  try {
    const { email } = req.body;// Extraction de l'email du corps de la requête
    console.log(req.body);// Affichage du corps de la requête dans la console

    const sql = `SELECT * FROM users WHERE email=? `;// Requête SQL pour sélectionner l'utilisateur correspondant à l'email
    connection.query(sql, [email], (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json("Internal server error");// En cas d'erreur de la base de données, renvoie une réponse JSON avec un statut 500 (erreur interne du serveur) et un message d'erreur générique
      } else if (result.length === 0) {
        console.log("Result", result);
        res.status(400).json("Cannot fetch user");// Si aucun utilisateur n'a été trouvé, renvoie une réponse JSON avec un statut 400 (mauvvaise requête) et un message indiquant que l'utilisateur ne peut pas être récupéré
      } else {
        const otp = generateOTP();// Génération d'un code OTP (One-Time Password)
        const expiry = new Date(Date.now() + 10 * 60 * 1000); // set expiry to 10 minutes from now
        const userId = result[0].id;// Récupération de l'ID de l'utilisateur à partir du résultat de la requête
        console.log("user id:", userId);
        connection.query(
          "INSERT INTO otp SET ?",
          { email: email, code: otp, expiry: expiry, userId: userId },
          (error, results) => {
            if (error) {
              console.log(error);
              res.status(500).send("Internal server error");// En cas d'erreur de la base de données lors de l'insertion du code OTP, renvoie une réponse JSON avec un statut 500 et un message d'erreur générique
            } else {
              sendOTP(otp, email);// Envoi du code OTP à l'utilisateur (méthode non fournie dans le code)
              console.log("otp code : ", otp);
              res.status(200).json(userId);// Renvoie une réponse JSON avec un statut 200 (succès) et l'ID de l'utilisateur
              console.log("result from backend: ", result);
            }
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//function to generate otp code
function generateOTP() {
  /*const secret = crypto.randomBytes(32).toString('hex');
    const otp = crypto.createHash('sha256').update(secret).digest('hex').slice(0, 6);*/
  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return otp;
}


//Email Template

const getPasswordResetHTML = require("../../config/WebModel");
// function for sending otp code
const sendOTP = (otp, email) => {
  try {
    const html = getPasswordResetHTML(otp);
    // Setting the sender informations
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dawarji2023@gmail.com",
        pass: "nkmflmjtcamedgij",
      },
    });
    //Setting the mail options
    const mailOptions = {
      to: email,
      subject: "otp code from DAWARJI",
      /*text: text,*/ //we can add a text instead of using a html
      html: html,
    };

    // Mail sedding Action
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send("Server error ⚠️");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Mail Send Successfuly ✅");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong ⚠️");
  }
};

//route for otp verification
router.post("/VerifyOTp", (req, res) => {
  const { otp, id } = req.body;// Extraction du code OTP et de l'ID de l'utilisateur du corps de la requête


  console.log("request:",req.body);// Affichage du corps de la requête dans la console

  connection.query(
    "SELECT * FROM otp WHERE userId = ? AND code = ? AND expiry > NOW()",
    [id, otp],
    (error, results) => {
      
      if (error) {
        console.log(error);
        res.status(500).send("Internal server error");// En cas d'erreur de la base de données, renvoie une réponse avec un statut 500 et un message d'erreur générique
      } else if (results.length === 0) {
        res.status(400).send("Invalid OTP code");// Si aucun résultat n'est trouvé, renvoie une réponse avec un statut 400 et un message indiquant que le code OTP est invalide
      } else {
        connection.query(
          "DELETE FROM otp WHERE userId = ?",
          [id],
          (error, results) => {
            if (error) {
              console.log(error);
            }
          }
        );
      // Renvoie une réponse avec un statut 200 (succès) et l'ID de l'utilisateur
    }
    }
  );
});
//route for changing password
router.post("/changePassword", (req, res) => {
  const { password, id } = req.body;// Extraction des données password et id du corps de la requête
  console.log("this is the reqquest",req.body);// Affichage des données de la requête dans la console
 // Requête pour sélectionner l'utilisateur avec l'ID spécifié
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [id],
    (error, results) => {
       console.log(results);// Affichage des résultats de la requête dans la console
 // Gestion des erreurs
      if (error) {
        console.log(error);// Affichage de l'erreur dans la console
        res.status(500).send("Internal server error");// Envoi d'une réponse d'erreur au client
      } else if (results.length === 0) {
        res.status(400).send("Invalid fetch");// Envoi d'une réponse d'erreur au client si aucun utilisateur trouvé avec l'ID spécifié
      } else {
        const passwordHashed = null;// Initialisation d'une variable pour stocker le mot de passe hashé
      // Génération d'un salt pour le hachage du mot de passe
        bcrypt
          .genSalt(10)
          .then((salt) => {
            console.log("Salt: ", salt);// Affichage du salt dans la console
             // Hachage du mot de passe avec le salt généré
            return bcrypt.hash(password, salt);
          })
          .then((hash) => {
            console.log(hash);// Affichage du mot de passe hashé dans la console
            // Requête pour mettre à jour le mot de passe de l'utilisateur avec le mot de passe hashé
            const sqlQuery = "UPDATE users SET password = ? WHERE id = ?";

        connection.query(sqlQuery, [hash, id], (error, results) => {
          if (error) {
            console.log(error);// Affichage de l'erreur dans la console
            res.status(500).send("Internal server error");// Envoi d'une réponse d'erreur au client
          } else {
            res.status(200).send("Password reset successful");// Envoi d'une réponse de succès au client
          }
        });
          })
          .catch((err) => console.error(err.message));// Gestion des erreurs lors du hachage du mot de passe

        
      }
    }
  );
});
module.exports = router;
