const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/foo", async (request, response, next) => {
  try {
    throw new Error("으아악");
  } catch (error) {
    request.error(error);
  }
  response.send("BOOM!!");
});

module.exports = router;
