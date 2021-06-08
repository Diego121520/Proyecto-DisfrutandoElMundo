const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
country = require('./country');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(country);

module.exports = router;
