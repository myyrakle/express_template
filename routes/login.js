const express = require('express');
const router = express.Router();

router.post('/login', async (request, response, next)=>{

    response.json({token:token});
});