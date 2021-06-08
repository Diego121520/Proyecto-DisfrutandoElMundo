const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('touristActivity',{
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        difficulty:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        duration:{
            type: DataTypes.STRING,
            allowNull: false
        },
        season:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};