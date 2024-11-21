module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        checkIn: {
            type: DataTypes.DATE,
            allowNull: false
        },
        checkOut: {
            type: DataTypes.DATE,
            allowNull: false
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
            defaultValue: "pending"
        }
    });

    Booking.associate = (models) => {
        Booking.belongsTo(models.User, {
            foreignKey: "tenantId",
            as: "tenant"
        });

        Booking.belongsTo(models.Property, {
            foreignKey: "propertyId",
            as: "property"
        })
    }

    return Booking;
}
