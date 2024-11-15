const validateUserMiddleware = (req, res, next) => {

    const { name } = req.body;

    if (!name || name.length < 3) {
        return res.status(400).json({
            message: 'Le nom doit faire minimum de 3 caractères'
        })
    }

    next();
}

module.exports = { validateUser: validateUserMiddleware }
