const express = require('express');
const db = require('./models');
const router = require('./router');

const app = express();
const PORT = 3000;

const initDbConnection = async () => {
    try {
        await db.sequelize.sync({force: true})
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
