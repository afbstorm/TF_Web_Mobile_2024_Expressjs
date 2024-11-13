// Importation d'express
const express = require('express');

const app = express();
const PORT = 8000;

// Middleware pour parser le JSON
app.use(express.json());

// Route de base
app.get('/', (req, res) => {
    // res.status(200).send('Hello World');
    res.status(200).json({message: 'Bienvenue sur votre premier micro serveur expressjs'})
})

// Écoute du port
app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
})
