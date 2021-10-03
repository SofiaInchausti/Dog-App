const {DataTypes} = require('sequelize')

module.exports = function(sequelize) {

    return sequelize.define('temperament', {
       
        name: {
            type: DataTypes.STRING,
            },
    })
}