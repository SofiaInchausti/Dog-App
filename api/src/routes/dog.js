const express = require('express')
const {Dog,Temperament} = require('../db')
const { v4: uuidv4 } = require('uuid');
const router = express.Router()
const axios = require('axios')
const apiKey=require ("../../utils/config");


function getApi (){
    var apiDogsPromise=axios.get('https://api.thedogapi.com/v1/breeds/?api_key'+apiKey)
        var dbDogsPromise=Dog.findAll({
            include:Temperament
    })
    
    return Promise.all([
        apiDogsPromise,
        dbDogsPromise
    ]).then(result=>{
        var apiDogs=result[0].data
        var dbDogs=result[1]
        
       
              
        apiDogs = apiDogs.map((d) => {
            return {
                id: d.id,
                name: d.name,
                image: d.image.url,
                height:d.height.metric? d.height.metric:"0",
                weight:d.weight.metric? d.weight.metric:"0",
                // .split(" - ").map(e=>e==="NaN"? e=6:e=e) :["1"],
                //  : ["1"], // map(e=>e==="NaN"? e=6:e=e),
               
                lifeSpan:d.life_span,
                temperaments:d.temperament? d.temperament.split(","): ["This dog no has temperaments added"]
            }
        })
        dbDogs = dbDogs.map((d) => {
            return {
                id: d.id,
                name: d.name,
                image: d.image,
                height:d.height? d.height:"0",
                weight:d.weight? d.weight:"0",
                // split("-"): ["1"],
                lifeSpan:d.lifeSpan,
                temperaments:d.temperaments.map(e=>e.name)

            }
        })
        console.log(dbDogs)
        
        totalDogs=dbDogs.concat(apiDogs)
        // console.log(totalDogs)
      
        return totalDogs
        })
    }


    router.get('/:idRaza', async (req, res, next) => {
        const idRaza = req.params.idRaza    
        try{
            var dogs=await getApi()
            if(!idRaza || idRaza > 300) {
            return next({msg: 'Id incorrecto', status: 500})
            }else {
                const result=dogs.filter(d=>{
                    if(d.id && d.id ==idRaza){           
                        return d
                        }
                    })
                    res.status(200).send(result)
            }
        }
        catch(error) {
            next(error)
        }
    
    })

    router.get("/",async (req,res,next)=>{   
    var name= req.query.name   
    
    try{ 
        var apiDogs= await getApi()  
        if(!name){            
            const dogs=apiDogs.map(d=>{
                return{
                    id:d.id,
                    name:d.name,
                    image:d.image?d.image:"https://bitsofco.de/content/images/2018/12/broken-1.png",
                    temperaments:d.temperaments? d.temperaments.map(e=>e?.trim()): ["temperamet not found"],
                    weight:d.weight.split(" - ").map(e=>e==="NaN"? e=6:e=e),
                    height:d.height,
                    lifeSpan:d.lifeSpan,
                    
                }
            })
            return res.status(200).send(dogs)
        }else{
            const result=apiDogs.filter(d=>{
                if(d.name && d.name.toLowerCase().includes(name.toLocaleLowerCase())){
                    return d 
                }
            })
        return res.status(200).send(result)        
        }    
    }
    catch(error){
        next('Unable to connect to the database:')
    }
          
    
})


router.post('/',async (req, res,next) => {
    const {name,image,height,weight,lifeSpan,temperaments} = req.body
    try{
        let dog=await Dog.create({
            id: uuidv4(),
            name,
            image,
            height,
            weight,
            lifeSpan,       
        })
        let tempOndb= await Temperament.findAll({where: {
            name: temperaments
            }})
       
          dog.addTemperaments(tempOndb) 
          
          res.status(200).send(dog);
          

    }      
    catch{
        error => next(error)
    }
})



module.exports = router