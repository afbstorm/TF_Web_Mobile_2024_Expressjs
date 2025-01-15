module.exports = (sequelize, DataTypes) => {
  const Garage = sequelize.define("Garage", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1,100]
      }
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: -90,
        max: 90
      }
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: -180,
        max: 180
      }
    },
  });

  Garage.associate = (models) => {
    Garage.hasMany(models.Sale, {
      foreignKey: "garageId",
      as: "sales"
    })
  };

  return Garage;
};
