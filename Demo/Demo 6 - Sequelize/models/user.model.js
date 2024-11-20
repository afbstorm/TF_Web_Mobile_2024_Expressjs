module.exports = (sequelize, DataTypes) => {
    // Déclaration du model User qui sera transformé en table SQL (relationnelle) dans pgAdmin
    const User = sequelize.define('User', {
        // Identifiant de l'utilisateur
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: "Identifiant unique auto-incrémenté de l'utilisateur"
        },
        // Nom de l'utilisateur AVEC validations
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // Vérifie que le nom n'est pas vide
                notEmpty: {
                    msg: "Le nom ne peut pas être vide"
                },
                // Vérifie la longueur du nom
                len: {
                    args: [2, 50],
                    msg: "Le nom doit avoir entre 2 et 50 caractères"
                },
            },
            comment: "Nom de famille de l'utilisateur"
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                // Vérifie le format de l'email
                isEmail: {
                    msg: "Format d'email invalide"
                },
                notEmpty: {
                    msg: "L'email ne peut pas être vide"
                }
            },
            comment: "Adresse email unique"
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Le mot de passe ne peut pas être vide"
                },
                len: {
                    args: [6,100],
                    msg: "Le mot de passe doit avoir entre 6 et 100 caractères"
                }
            },
            comment: "Mot de passe hashé de l'utilisateur"
        }
    },
        {
            // Options du model
            defaultScope: {
                // Exclut par défaut un ou plusieurs éléments des requêtes
                attributes: {
                    exclude: ['password']
                }
            },
            timestamps: true // AJoute automatique les colonnes createdAt et updatedAt - L'option est présente en true par défaut
        });

    /**
     * Définition des associations / relations du modèle User
     * @param {Object} models - Tous les modèles de l'application
     * One-to-Many (1:N) :
     *
     * Utilise hasMany d'un côté
     * Utilise belongsTo de l'autre
     * Crée une clé étrangère dans la table many
     * Exemple : Un auteur a plusieurs articles
     *
     * Many-to-One (N:1) :
     *
     * C'est l'inverse du One-to-Many
     * Même structure mais inversée
     * Exemple : Plusieurs artiles appartiennent à l'auteur
     *
     * Many-to-Many (N:N) :
     *
     * Utilise belongsToMany des deux côtés
     * Nécessite une table de jointure (through)
     * Crée deux clés étrangères dans la table de jointure
     * Exemple : Imaginons une table Category : Chaque article appartiendrait a une ou plusieurs catégories et chaque catégorie aurait un ou plusieurs articles
     */

    User.associate = (models) => {
        // Un utilisateur peut avoir plusieurs articles
        User.hasMany(models.Article, {
            foreignKey: 'authorId', // Clé étrangère qui va être dans la table Article
            as: 'articles' // Alias pour les requêtes
        })
    }

    return User;
}
