const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async (request, response, next)=>{
  res.send('BOOM!!');
});

module.exports = router;
