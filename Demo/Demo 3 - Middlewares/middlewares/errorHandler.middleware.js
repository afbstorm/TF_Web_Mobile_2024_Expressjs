const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        error: 'Erreur serveur',
        message: 'Une erreur inconnue est survenue'
    })
}

module.exports = errorHandler;
