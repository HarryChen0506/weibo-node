/**
 * Created by Harry Chen on 2017/2/14.
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user')
var util = require('util');
var isLogin = require('../utiltool/isLogin');


/* GET users listing. */
router.get('/',isLogin.checkNotLogin);
router.get('/', function (req, res, next) {
    res.render('login',{ title:'Express' });
});

router.post('/', function (req,res,next) {
    //生成口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var loginUser = new User({
        name:req.body.username,
        password:password
    })

    //判断用户名是否正确
    User.get(loginUser.name, function (err,user) {
        if(err){
            req.flash('error','用户名不存在');
           return res.redirect('/login');
        }
        if(!user){
            req.flash('error','用户名不存在');
            return res.redirect('/login');
        }
        if(user.password != loginUser.password){
            req.flash('error','口令不正确');
            return res.redirect('/login');
        }
        req.session.user = user;
        req.flash('success','登录成功');
        res.redirect('/u/'+loginUser.name);

    })

})

module.exports = router;
