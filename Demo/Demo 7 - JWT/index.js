const express = require('express');
const db = require('./models');
const router = require('./router');

const app = express();
// Appel de la variable d'environnement depuis l'object process
const PORT = process.env.PORT;

const initDbConnection = async () => {
    try {
        await db.sequelize.sync({force: false})
        console.log('Base de données synchronisée ✅')
    } catch (err) {
        console.error('Erreur de synchronisation ❌ :', err )
    }
}

initDbConnection()

app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
})
