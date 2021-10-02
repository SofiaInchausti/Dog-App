const express = require('express')
const {Temperament} = require('../db')
const router = express.Router()


router.get('/', async (req, res,next) => {      
    try {
        const temperament = await Temperament.findAll()
        
        res.json(temperament)
    } 
    catch (error) {
        next(error)
    }
})



module.exports = router