const { Router } = require('express');
const pokemonRoutes = require("./pokemonRoutes")
const typeRoutes = require("./typeRoutes")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons',pokemonRoutes)
router.use('/types',typeRoutes)

module.exports = router;
