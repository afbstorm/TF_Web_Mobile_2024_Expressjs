const express = require('express');
const appLvlMiddleware = require('./middlewares/appLvl.middleware');
const auth = require('./middlewares/auth.middleware');
const errorHandler = require('./middlewares/errorHandler.middleware');

const app = express();

// Utilisation du middleware application-level
app.use(appLvlMiddleware)
const PORT = 8000;

app.get('/', (req, res) => {
    res.json({message: 'Page d\'acceuil'});
})

// Utilisation du middleware route-level
app.get('/private', auth, (req, res) => {
    res.json({message: 'Page avec accès restreint'})
})

app.get('/error', (req, res, next) => {
    next(new Error('Erreur'))
})

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`)
});
