const { stream } = require("./winston.config");

const injectWiston = (req, res, next) => {
    req.error = (message) => {
        // eslint-disable-next-line no-console
        console.log(message);
        stream.error(message);
    };
    next();
};

module.exports = injectWiston;
