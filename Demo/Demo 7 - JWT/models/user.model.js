module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("tenant", "owner", "admin"),
            defaultValue: "tenant"
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Property, {
            foreignKey: "ownerId",
            as: "properties"
        });

        User.hasMany(models.Booking, {
            foreignKey: "tenantId",
            as: "bookings"
        });
    }

    return User;
}
