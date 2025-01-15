const express = require('express');
const router = require('./router');
const db = require('./models');


const app = express();
const PORT = 3001;

const initDbConnection = async () => {
    try {
        await db.sequelize.sync({force: true})
        console.log('Base de données synchronisée ✅');
    } catch (error) {
        console.error('Erreur de synchronisation:', error);
    }
}

initDbConnection()

app.use(express.json());
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`)
})

