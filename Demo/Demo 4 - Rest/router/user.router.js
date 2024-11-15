const router = require('express').Router();
const { validateUser } = require('../middlewares/validateUser.middleware');

// Status code :
/*
200 : OK
201 : Created
204 : No-Content
404 : Not Found
403 : Forbidden
401 : Unauthorized
301 : Redirect
500 : Error server
 */

let usersList = [];

// http://localhost:8000/api/users
router.get('/', (req, res) => {
    res.status(200).json({
        users: usersList,
    })
})

// http://localhost:8000/api/users/:id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // const { id } = req.params;
    const user = usersList.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            error: 'Not Found',
            message: "L'id spécifié n'appartient à aucun utilisateur"
        })
    }

    res.status(200).json({
        user
        // user: user
    })
})

// http://localhost:8000/api/users
router.post('/', validateUser, (req, res) => {
    const { name, age, job } = req.body;
    const user = {
        id: Math.floor(Math.random() * 100),
        name,
        age,
        job
    };

    usersList.push(user);
    res.status(201).json({
        message: 'Utilisateur correctement ajouté',
        user
    })
})

// http://localhost:8000/api/users/:id
router.put('/:id', validateUser, (req, res) => {
    const id = parseInt(req.params.id);
    // const { name, age, job } = req.body;

    const user = usersList.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({
            error: 'Not Found',
            message: "L'id spécifié n'appartient à aucun utilisateur"
        })
    }


    // Version Khalid //
    // const { ...userInfo } = req.body;
    // Object.keys(userInfo).forEach(key => {
    //     user[key] = userInfo[key]
    // })

    // Parcourt l'object pour vérifier les clés/valeurs et comparer avec les valeurs existantes
    // pour informer du changement
    const hasChanges = Object.keys(user).some(key => user[key] !== req.body[key]);

    console.log(hasChanges)
    if (!hasChanges) {
        return res.status(204).json({
            message: "Aucun changements détectés"
        })
    }

    Object.assign(user, req.body);

    res.status(200).json({
        message: 'Utilisateur correctement mis à jour',
        users: usersList
    })
})

module.exports = router;
