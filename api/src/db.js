
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {dbUser,dbName,dbPassword, dbHost,dbPort,apiKey}=require ("../utils/config");
const { Console } = require('console');


const sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?api_key=${apiKey} `, {
  logging: false, 
  native: false, 
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Dog,Temperament } = sequelize.models;

Dog.belongsToMany(Temperament, {through: 'Dog_Temperament'})
Temperament.belongsToMany(Dog, {through: 'Dog_Temperament'})

module.exports = {
  ...sequelize.models,
  conn: sequelize,    
};
