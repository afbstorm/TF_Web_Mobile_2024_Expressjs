module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: "Identifiant unique auto-incrémenté de l'article"
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Le titre ne peut pas être vide"
                },
                len: {
                    args: [3, 100],
                    msg: "Le titre de l'article doit faire entre 3 et 100 caractères"
                }
            },
            comment: "Titre de l'article"
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Le content ne peut pas être vide"
                },
                len: {
                    args: [50, 1000],
                    msg: "Le content de l'article doit faire entre 50 et 1000 caractères"
                }
            },
            comment: "Contenu de l'article"
        },
        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            validate: {
                // Vérification que la valeur reçue est bien une valeur booléenne
                isBoolean(value) {
                    if (typeof value !== 'boolean') {
                        throw new Error('La valeur published doit être une valeur booléenne')
                    }
                }
            },
            comment: "Indique si l'article est publiée ou non"
        }
    });

    Article.associate = (models) => {
        // Un article appartient à un utilisateur
        Article.belongsTo(models.User, {
            foreignKey: 'authorId', // Clé étrangère qui réfèrence l'utilisateur
            as: 'author'
        })
    }

    return Article;
}
