const appLvlMiddleware = (req, res, next) => {
    console.log(`Requête effectuée le : ${new Date().toLocaleDateString('fr-FR')} sur 
    l'url : ${req.url} avec la méthode : ${req.method}`);

    next();
}

module.exports = appLvlMiddleware;
