const { Router } = require("express");
// Importar todos los routers;
const countriesRoutes = require("./Countries.js");
const activityRoutes = require("./Activities.js");
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//* Middleware para todas las rutas 
router.use('/countries', countriesRoutes)
router.use('/activity', activityRoutes)

module.exports = router;
