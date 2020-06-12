const { stream } = require("./winston.config");

const injectWiston = (request, response, next) => {
  request.error = (message) => {
    // eslint-disable-next-line no-console
    console.log(message);
    stream.error(message);
  };
  next();
};

module.exports = injectWiston;
