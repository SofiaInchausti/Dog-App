
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {dbUser,dbName,dbPassword, dbHost,dbPort,apiKey}=require ("../utils/config");
const { Console } = require('console');


const sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?api_key=${apiKey} `, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);
//

// ESTO ES FILE C:\Users\Sofia\Desktop\PI-Dogs\PI\PI-Dogs\api\src\db.js, PATH ES db.js

const modelDefiners = [];

//__DIRNAME ES EL DIRECTORIO MAYOR, CARPETA PADRE HASTA AHI LLEGA ...\SRC


// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog,Temperament } = sequelize.models;


// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Dog.belongsToMany(Temperament, {through: 'Dog_Temperament'})
Temperament.belongsToMany(Dog, {through: 'Dog_Temperament'})

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
