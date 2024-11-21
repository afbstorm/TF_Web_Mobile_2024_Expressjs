module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "La catégorie doit avoir un nom."
                },
                len: {
                    args: [2,50],
                    msg: "La catégorie doit faire entre 2 et 50 caractères."
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            validate: {
                len: {
                    args: [0,500],
                    msg: "La description ne peut pas dépasser les 500 caractères."
                }
            }
        }
    })

    Category.associate = (models) => {
        Category.hasMany(models.Book, {
            foreignKey: 'categoryId',
            as: 'books'
        })
    }

    return Category;
}
