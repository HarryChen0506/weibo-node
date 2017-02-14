/**
 * Created by Harry Chen on 2017/2/14.
 */
var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
