/**
 * Created by Harry Chen on 2017/2/14.
 */
var express = require('express');
var router = express.Router();

/* GET reg listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a get resource');
});
router.post('/', function (req,res,next) {
    res.send('respond with a post resource');
})

module.exports = router;
