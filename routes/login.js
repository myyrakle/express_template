const express = require("express");
const router = express.Router();

router.post("/login", async (request, response, next) => {
  response.json({ token: 0 });
});

module.exports = router;
