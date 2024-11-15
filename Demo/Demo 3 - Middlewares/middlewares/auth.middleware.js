const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || token !== 'Bearer jsonwebtoken') {
        return res.status(401).json({error: "Accès non autorisé"})
    }

    next();
}

module.exports = auth;
