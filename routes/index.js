const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/test", async (req, res, next) => {
    if (req.authorizer.authorized) {
        res.json({ msg: "돌아감", value: req.authorizer.tokenValue });
    } else {
        res.json({ msg: "인증 안됨" });
    }
});

module.exports = router;
