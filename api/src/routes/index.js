const express=require('express')

const dogRoutes= require('./dog')
const temperamentsRoutes = require('./temperament')

const router=express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogRoutes) // /api/characters/
router.use('/temperament', temperamentsRoutes)


module.exports = router;
