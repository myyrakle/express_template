var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/foo", function (request, response, next) {
  response.send("respond with a resource");
});

module.exports = router;
