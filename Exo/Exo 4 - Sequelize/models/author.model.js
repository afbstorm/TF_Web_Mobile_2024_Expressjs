const {Sequelize} = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('Author', {
        id: {
            type: DataTypes.UUIDV4,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Le prénom doit être présent."
                },
                len: {
                    args: [2, 50],
                    msg: "Le prénom doit contenir entre 2 et 50 caractères."
                }
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Le nom de famille doit être présent."
                },
                len: {
                    args: [2, 50],
                    msg: "Le nom de famille doit contenir entre 2 et 50 caractères."
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: "Format d'email invalide."
                }
            }
        },
        bio: {
            type: DataTypes.TEXT,
            validate: {
                len: {
                    args: [0,1000],
                    msg: "La présentation de l'auteur ne peut pas dépasser 1000 caractères."
                }
            }
        }
    })

    Author.associate = (models) => {
        Author.hasMany(models.Book, {
            foreignKey: 'authorId',
            as: 'books'
        })
    }

    return Author;
}
