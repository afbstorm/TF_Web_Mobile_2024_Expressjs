const express = require('express');
const appLvlMiddleware = require('./middlewares/appLvl.middleware');
const router = require('./router');

const app = express();
const PORT = 8000;

app.use(appLvlMiddleware);
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`)
});
