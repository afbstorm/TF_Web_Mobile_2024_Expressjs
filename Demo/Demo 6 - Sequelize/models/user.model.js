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
        })

    return User;
}
