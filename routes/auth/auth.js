const express = require("express");
const router = express.Router();

router.post("/login", async (req, res, next) => {
    const token = req.authorizer.makeToken({ id: 12 });
    res.json({ token: token });
});

router.post("/login-refresh", async (req, res, next) => {
    res.json({ token: 0 });
});

router.post("/register-account", async (req, res, next) => {
    res.json({ success: true });
});

router.post("/delete-account", async (req, res, next) => {
    res.json({ success: true });
});

module.exports = router;
