async function database(request, response, next) {
  // request.sequelize = require("./../Model/connect");
  //   request.model = {
  //     User: require("./../Model/User"),
  //   };

  next();
}

module.exports = database;
