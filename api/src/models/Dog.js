const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   return sequelize.define('dog', {
    id:  {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true
    },
    height: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    weight:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    lifeSpan:{
        type: DataTypes.TEXT,
        allowNull: true
        
    }
})
}