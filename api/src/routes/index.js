const express=require('express')

const dogRoutes= require('./dog')
const temperamentsRoutes = require('./temperament')

const router=express.Router();

router.use('/dogs', dogRoutes) 
router.use('/temperament', temperamentsRoutes)


module.exports = router;
