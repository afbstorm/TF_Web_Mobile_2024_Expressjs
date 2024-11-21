module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define('Property', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pricePerNight: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });

    Property.associate = (models) => {
        Property.belongsTo(models.User, {
            foreignKey: "ownerId",
            as: 'owner'
        });

        Property.hasMany(models.Booking, {
            foreignKey: "propertyId",
            as: "bookings"
        });
    }

    return Property;
}
