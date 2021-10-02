require('dotenv').config();

module.exports={
    dbUser:process.env.DB_USER,
    dbName:process.env.DB_NAME,
    dbPassword:process.env.DB_PASSWORD,
    dbHost:process.env.DB_HOST,
    dbPort:process.env.DB_PORT,
    apiKey:process.env.API_KEY_DOG,

}
