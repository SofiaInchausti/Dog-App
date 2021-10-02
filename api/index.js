//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const axios  = require('axios');
const server = require('./src/app.js');
const { conn,Temperament } = require('./src/db.js');
const apiKey=require('./utils/config')

// Syncing all the models at once.
///CUANDO HAGA FRONT CAMBIAR A TRUE 
conn.sync({ force: true})
  .then(async() => {
    const apiDogsTemp=await axios.get("https://api.thedogapi.com/v1/breeds?api_key"+apiKey)


    let dogsTemp=apiDogsTemp.data
   
    let dogsTemperament=dogsTemp.map(d=>{
      if(d.temperament){
        return d.temperament.split(",")
      }
    })
    let dogs=dogsTemperament.flat()   
    let finalDogs=dogs.map(e=>{
      if(e){
        return e.trim().toLowerCase()
        
      }
    })
    
    let result = finalDogs.filter((item,index)=>{
      return finalDogs.indexOf(item) === index;
    })
    let resultado=result.sort().map(d=>{
      return{
        name:d
      }
    })

   
    await Temperament.bulkCreate(resultado)
    

    server.listen(3001, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
});
