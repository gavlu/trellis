'use strict';

var express = require('express');
var controller = require('./plant.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);

router.use(auth.isAuthenticated());

router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
