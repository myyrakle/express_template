async function database(request, response, next){
    request.db = {
        User: require('./../Model/User'),
    };

    next();
}

module.exports = database;