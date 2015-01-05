'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();
//not sure restfull
//usersearch
//populatetrellis
router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/populateTrellis/', auth.isAuthenticated(), controller.populateTrellis);
router.put('/clone/', auth.isAuthenticated(), controller.clone)
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/userSearch/', auth.isAuthenticated(), controller.findUser);
router.post('/', controller.create);
router.patch('/', auth.isAuthenticated(), controller.update);


module.exports = router;
