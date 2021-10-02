const {DataTypes} = require('sequelize')

module.exports = function(sequelize) {

    return sequelize.define('temperament', {
       
        name: {
            type: DataTypes.STRING,
            //si pongo en false me da error
            // allowNull: false
            
        },
    })
}