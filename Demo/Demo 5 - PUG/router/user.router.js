const router = require('express').Router();

const users = [
    {
        id: 1,
        name: "Sarah Connor",
        email: "sarah@resistance.us",
        bio: "La mère du sauveur de l'humanité",
        avatar: "sarah.jpg"
    },
    {
        id: 2,
        name: "Paul Atreides",
        email: "paul@tamerofsandworms.planet",
        bio: "Le sauveur de la planète avec les beaux yeux",
        avatar: "paul.webp"
    }
]

router.get('/', (req, res) => {
    res.status(200).render('users/index', {
        title: 'Users',
        users
    })
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "L'utilisateur avec cet id n'existe pas"
        });
    }

    res.status(200).render('users/details', {
        title: 'Profile',
        user
    })
})

module.exports = router;
