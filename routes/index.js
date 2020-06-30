const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/test", async (request, response, next) => {
  response.send("돌아감");
});

module.exports = router;
