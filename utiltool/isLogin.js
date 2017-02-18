/**
 * Created by acer on 2017/2/18.
 */

var isLogin = {};
isLogin.checkLogin = function (req, res, next) {
    if (!req.session.user) {
        req.flash('error', ' 未登录');
        return res.redirect('/login');
    }
    next();
}
isLogin.checkNotLogin = function (req, res, next) {
    if(req.session.user){
        req.flash('error','已登录')
        return res.redirect('/')
    }
    next();
}
module.exports = isLogin;