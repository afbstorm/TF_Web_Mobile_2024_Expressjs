const router = require('express').Router();

let users = [
    {
        id: 1,
        name: 'Khalid',
        email: 'khathesilencer@gmail.com'
    },
    {
        id: 2,
        name: 'Nicolas',
        email: 'nicothetalker@gmail.com'
    }
];

router.get('/utilisateurs', (req, res) => {
    res.status(200).send(users);
})

router.get('/utilisateurs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({error: "Utilisateur inexistant"});
    }

    res.send(user);
})

router.post('/ajouter-utilisateur', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        // Si pas de name ou d'email, on envoi le status code 403 : " Unauthorized " qui
        // va permettre de spécifier une erreur côté client (user)
        // Et on attache un texte expliquant l'erreur
        // return res.status(403).json({message: 'Nom et email requis'});
        return res.status(403).send('Nom et email requis');
    }

    const newUser = {
        id: users.length +1,
        // Vu que la clé de l'object porte le même nom que le variable contenant l'information
        // On peut spécifier une seule fois le nom de clé plutôt que d'écrire "name : name"
        name,
        email
    };

    users.push(newUser);
    res.status(201).json({message: "Utilisateur crée avec succès"});

})

router.put('/modifier-utilisateur/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const userIndex = users.findIndex(u => u.id === id);

    // Si findIndex retourne -1 cela veut dire qu'il n'y a pas de correspondance
    if (userIndex === -1) {
        return res.status(404).json({message: "Utilisateur inexistant"})
    }

    // On récupère l'utilisateur dans la liste des users
    users[userIndex] = {
        ...users[userIndex],
        // Injecte le name ou l'email reçu dans le body de la request
        // Ou celui déjà existant si rien reçu
        name: name || users[userIndex].name,
        email: email || users[userIndex].email
    }

    res.status(200).send('Utilisateur mis à jour correctement');
})

router.delete('/supprimer-utilisateur/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({message: "Utilisateur inexistant"})
    }

    users = users.filter(u => u.id !== id);

    res.status(200).send('Utilisateur supprimé avec succès')
})

module.exports = router;

