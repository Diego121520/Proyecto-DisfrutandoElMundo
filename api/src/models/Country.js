const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    flagimage:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent:{
      type: DataTypes.STRING(40),
      allowNull: false
    },
    capitalCity:{
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    subregion:{
      type: DataTypes.STRING(40),
    },
    area:{
      type: DataTypes.STRING
    },
    population:{
      type: DataTypes.INTEGER
    }
  });
};
