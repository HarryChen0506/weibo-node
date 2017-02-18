/**
 * Created by Harry Chen on 2017/2/14.
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user')
var util = require('util');
var isLogin = require('../utiltool/isLogin');

/* GET reg listing. */
router.get('/',isLogin.checkNotLogin);
router.get('/', function(req, res, next) {
    res.render('reg', { title: 'Express' });
});

router.post('/',isLogin.checkNotLogin);
router.post('/', function (req,res,next) {
    //检测两次指令是否一致
    if(req.body['password']!=req.body['password-repeat']){
        //console.log('两次输入的指令不一致');
        req.flash('error','两次输入的指令不一致');
       return  res.redirect('/reg');
    }
    //生成口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({
        name:req.body.username,
        password:password
    })

    //检查用户名是否已经存在
    User.get(newUser.name, function (err,user) {
        if(user){
            console.log('用户存在'+util.inspect(user,true));
            err = 'Username already exists';
        }
        if(err){
            req.flash('error',err);
            return res.redirect('/reg');
        }
        //如果不存在则新增用户
        newUser.save(function (err) {
            if(err){
                req.flash('err',err);
                return res.redirect('/reg')
            }
            console.log('用户名：'+util.inspect(newUser,true));
            req.session.user = newUser;
            req.flash('success','注册成功');
            res.redirect('/')
        })

    })
});

module.exports = router;
