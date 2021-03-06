/**
 * Created by Harry Chen on 2017/2/16.
 */
var mongodb = require('./db');
var util = require('util');

function User(user) {
    this.name = user.name;
    this.password = user.password;
};

User.prototype.save = function save(callback) {
    // 存入 Mongodb 的文檔
    var user = {
        name: this.name,
        password: this.password,
    };
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        // 讀取 users 集合
        db.collection('users', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            // 爲 name 屬性添加索引
            collection.ensureIndex('name', {unique: true});
            // 寫入 user 文檔
            collection.insert(user, {safe: true}, function(err, user) {
                mongodb.close();
                callback(err, user);
            });
        });
    });
};

User.get = function get(username, callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        // 讀取 users 集合
        db.collection('users', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            // 查找 name 屬性爲 username 的文檔
            collection.findOne({name: username}, function(err, doc) {
                mongodb.close();
                if (doc) {
                    // 封裝文檔爲 User 對象
                    //doc{ _id: 58a5b6c02dc5528b88a49887,
                    //    name: 'q',
                    //    password: 'ICy5YqxZB1uWSwcVLSNLcA==' }
                    //console.log('doc'+util.inspect(doc,true));
                    var user = new User(doc);
                    callback(err, user);
                } else {
                    callback(err, null);
                }
            });
        });
    });
};

module.exports = User;
