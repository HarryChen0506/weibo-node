/**
 * Created by Harry Chen on 2017/2/14.
 */
var express = require('express');
var router = express.Router();
var isLogin = require('../utiltool/isLogin');

/* GET users listing. */
router.get('/',isLogin.checkLogin);
router.get('/', function(req, res, next) {
    req.session.user = null;
    req.flash('success', ' 登出成功');
    res.redirect('/');
});

module.exports = router;
