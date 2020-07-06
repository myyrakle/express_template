async function database(req, res, next) {
    // request.sequelize = require("./../Model/connect");
    //   request.model = {
    //     User: require("./../Model/User"),
    //   };

    next();
}

module.exports = database;
