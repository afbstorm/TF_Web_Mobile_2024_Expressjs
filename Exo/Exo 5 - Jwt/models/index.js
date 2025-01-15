const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/database");

// Création d'une nouvelle instance de Sequelize avec la configuration
const sequelize = new Sequelize(config);

// Création d'un objet vide qui va contenir tous nos modèles
const db = {};

// Lecture automatique des fichiers de modèles dans le dossier courant
fs.readdirSync(__dirname) // Lit tous les fichiers du répertoire courant
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && // Ignore les fichiers cachés (commençant par .)
      file !== "index.js" && // Ignore le fichier index.js lui-même
      file.slice(-3) === ".js" // Ne prend que les fichiers .js
    );
  })
  .forEach((file) => {
    // Pour chaque fichier trouvé :
    // 1. Construit le chemin complet du fichier
    // 2. Require le modèle
    // 3. L'initialise avec sequelize et DataTypes
    // 4. L'ajoute à l'objet db avec son nom comme clé
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Une fois tous les modèles chargés, on configure leurs associations
Object.keys(db).forEach((modelName) => {
  // Pour chaque modèle, si une méthode associate existe
  // On l'appelle en passant tous les modèles en paramètre
  // Cela permet de définir les relations entre les modèles
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// On ajoute l'instance sequelize à l'objet db
// Permet d'accéder à sequelize depuis n'importe où en important db
db.sequelize = sequelize;

// On ajoute aussi Sequelize (la classe) à db
// Utile pour accéder aux types et utilities de Sequelize
db.Sequelize = Sequelize;

// Export de l'objet db qui contient :
// - Tous nos modèles initialisés
// - L'instance sequelize
// - La classe Sequelize
module.exports = db;
