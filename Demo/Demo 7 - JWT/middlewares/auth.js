const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Ce middleware va servir à vérifier le token de l'utilisateur et authentifier ce dernier si le token est valide
const authenticateJWT = (req, res, next) => {
    // Récupération du token (jwt) dans le header d'Authorization
    const authHeader = req.header("Authorization");

    // Format du token va être Bearer token
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            error: "Accès refusé. Token manquant"
        })
    }

    try {
        // Vérification et décodage du token
        const user = jwt.verify(token, JWT_SECRET);
        // Si le token est valide, on stocke les infos utilisateur dans une nouvelle clé de la request
        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({
            error: "Token invalide ou expiré"
        })
    }
};

// Ce middleware va servir à vérifier le rôle de l'utilisateur
// Il ne peut passer la validation de ce middleware QUE s'il est owner
const isOwner = (req, res, next) => {
    if (req.user.role !== 'owner') {
        return res.status(403).json({
            error: "Accès refusé. Rôle propriétaire (owner) requis !"
        })
    }

    next();
}

module.exports = { authenticateJWT, isOwner };
