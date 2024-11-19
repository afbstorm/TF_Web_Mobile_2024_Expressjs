const fs = require('fs');
const path = require('path');
const config = require('../config/database');
const { Sequelize, DataTypes } = require('sequelize');

// Création d'une nouvelle instance de Sequelize avec la configuration
// On injecte la config dans le constructeur de la class Sequelize
const sequelize = new Sequelize(config);

// Création d'un object vide qui va contenir tous nos modèles (models) et les config
const db = {};


// Création de la lecture des fichiers models et synchronisation avec la DB
// Lecture automatique des fichiers models dans le dossier courant (models)
fs.readdirSync(__dirname) // Lit tous les fichiers du répertoire
    .filter(file => {
        return (
            file.indexOf('.') !== 0 && // Ignore les fichiers commençant par un .
            file !== 'index.js' && // Ignore le fichier index.js
            file.slice(-3) === '.js' // Ne prend que les fichiers .js
        )
    })
    .forEach(file => {
        // Pour chaque fichier trouvé :
        // - Construit le chemin complet du fichier
        // - Require le model
        // - Transférer les paramètres sequelize et DataTypes
        // - Ajout a l'object db avec son propre nom comme clé
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    })


// On ajoute l'instance de sequelize à l'object db
// Permet d'accèder à sequelize depuis n'importe où en important db
db.sequelize = sequelize;

// On ajoute aussi Sequelize (la class) à l'object db
// Utile pour accèder aux types et utils de Sequelize
db.Sequelize = Sequelize;


// L'instance sequelize
// La class Sequelize
module.exports = db;
