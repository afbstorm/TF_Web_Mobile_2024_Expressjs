module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Le titre doit être présent."
                },
                len: {
                    args: [1,100],
                    msg: "Le titre doit faire entre 1 et 100 caractères."
                }
            }
        },
        isbn: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "L'ISBN doit être présent."
                },
                len: {
                    args: [10,13],
                    msg: "L'ISBN' doit faire entre 10 et 13 caractères."
                }
            }
        },
        publicationYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: "L'année doit être un nombre entier."
                },
                min: {
                    args: [500],
                    msg: "L'année doit être supérieur à 500."
                },
                max: {
                    args: [new Date().getFullYear() +1],
                    msg: "L'année ne peut pas venir du futur."
                }
            }
        },
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    Book.associate = (models) => {
        Book.belongsTo(models.Author, {
            foreignKey: "authorId",
            as: "author"
        })
        Book.belongsTo(models.Category, {
            foreignKey: "categoryId",
            as: "category"
        })
    }

    return Book;
}
