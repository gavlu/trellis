'use strict';

var User = require('./user.model');
var passport = require('passport');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Adds the userId to the plants array
 */
exports.clone = function (req, res, next) {
  console.log("clone, hit!");
  console.log(req.user._id);
  var userId = req.user._id;
  console.log(userId);
  console.log("---------------------")
  console.log(req.body);
  User.findByIdAndUpdate(userId, { $push: { plants: req.body._id } }, function (err, user) {
    if(err) throw err ; 
    res.send(200);
  });
};

exports.populateTrellis = function (req, res, next) {
  console.log("populate, hit!!");
  var userId = req.user._id;
  User.findById(userId)
  // This has not been truly tested because there aren't any plants in any users yet (11/29)
  .populate('plants')
  .exec(function (err, user) {
    if (err) return res.send("Could not populate!");
    console.log('plants are: ', user.plants);
    res.json(user.plants);
    // prints current users plants array
  });
};


/**
 * Finds a user based on email or phone
 */
exports.findUser = function(req, res, next){
  User.findOne(req.body, {
    hashedPassword: 0,
    plants: 0,
    provider: 0,
    role: 0,
    salt: 0
  }, function(err, user) {
    res.json(user);
  });
};

/**
 * Updates a user based on an update object sent to server
 */
exports.update = function( req, res, next ) {
  console.log(req.body, 'update object');
  if(req.body._id) delete req.body._id;
  User.findByIdAndUpdate(req.user._id, req.body, function(err, user) {
    console.log("req.body._id: ", req.body._id);
    console.log("req.user._id: ", req.user._id);
    if ( err ) {console.log('ERR', err);}
    console.log('updated user', user);
    res.json(user);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;

  User.findOne({
    _id: userId
  }, '-salt -hashedPassword')
  .populate('plants')
  .exec(function (err, user) {
    if (err) return res.send("Could not populate!");
    console.log("!!!!!!")
    console.log(user);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
