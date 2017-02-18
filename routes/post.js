/**
 * Created by Harry Chen on 2017/2/14.
 */
var express = require('express');
var router = express.Router();
var isLogin = require('../utiltool/isLogin');
var Post = require('../models/post');

router.post('/', isLogin.checkLogin);
router.post('/', function(req, res, next) {
   var currentUser = req.session.user;
   var post = new Post(currentUser.name,req.body.post);
   post.save(function (err){
       if(err){
           req.flash('error',err);
           return res.redirect('/');
       }
       req.flash('success','发表成功');
       res.redirect('/u/'+currentUser.name);
   })

});

module.exports = router;
