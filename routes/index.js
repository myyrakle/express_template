const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/test", async (req, res, next) => {
    console.log(req.authorizer.tokenValue);
    res.json({ msg: "돌아감" });
});

module.exports = router;
