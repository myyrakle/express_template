const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/testf", async (req, res, next) => {
    res.send("돌아감");
});

module.exports = router;
