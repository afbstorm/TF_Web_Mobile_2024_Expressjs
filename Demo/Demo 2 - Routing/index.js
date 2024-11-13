const express = require('express');
const router = require('./router/tasks');

const app = express();
const PORT = 8000;

// Initialisation du parsing de json
app.use(express.json());
// Utilisation du router principal
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`)
});
