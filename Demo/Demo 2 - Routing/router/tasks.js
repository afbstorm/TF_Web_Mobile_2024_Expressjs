const router = require('express').Router();

// Initialisation d'un tableau vide
let tasks = [];

// Création de la route index de récupération de toutes les tâches
router.get('/', (req, res) => {
    res.status(200).json(tasks)
});

router.post('/', (req, res) => {
    const { title } = req.body;

    const task = {
        id: tasks.length + 1,
        title: title,
        completed: false
    }

    tasks.push(task);
    // 201 : Created
    res.status(201).json(task);
});

router.patch('/:id', (req, res) => {

    const { id } = req.params;

    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) {
        // 404 : Not Found
        return res.status(404).json({error: 'Tâche introuvable ou inexistante'})
    }

    task.completed = !task.completed;
    res.status(200).json(task);
})

module.exports = router;
