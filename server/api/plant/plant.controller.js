'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var Plant = require('./plant.model');


//this feels like it should really be in its own file
var sendEmail = function(to, subject, text){
  var options = {
    from: 'reminder.trellis@gmail.com',
    to: to,
    subject: subject,
    text: text
  }
  config.email.transporter.sendMail(options, function(err, info){
    if(err){
      console.log(err);
    }else{
      console.log('Message sent: ' + info.response);
    }
  config.email.transporter.close();
  });
}


//when do you list all plants for everyone?
// Get list of plants
exports.index = function(req, res) {
  Plant.find(function (err, plants) {
    if(err) { return handleError(res, err); }
    return res.json(200, plants);
  });
};

// Get a single plant
exports.show = function(req, res) {
  Plant.findById(req.params.id, function (err, plant) {
    if(err) { return handleError(res, err); }
    if(!plant) { return res.send(404); }
    return res.json(plant);
  });
};

// Creates a new plant in the DB.
exports.create = function(req, res) {
  Plant.create(req.body, function(err, plant) {
    if(err) { return handleError(res, err); }
    //you should call this function from a mongoose post save hook.
    sendEmail(req.user.email, 
      'You have a new plant to tend to!', 
      'Tend to your plant and make sure it gets an adequate amount of attention so that ' + req.body.name + ' can grow strong!'
    );
    return res.json(201, plant);
  });
};

// Updates an existing plant in the DB.
exports.update = function(req, res) {
  var objectId = req.body._id;

  var newObject = req.body;

  delete newObject._id;

  //findByIdAndUpdate bypasses mongoose hooks & validation. probably better to find then update
  //this means you'd need new endpoints for your nested data
  Plant.findByIdAndUpdate(objectId, {$set: newObject}, function(err, plant, numModified) {
    //check for err
    res.json(plant);
  });
};

// Deletes a plant from the DB.
exports.destroy = function(req, res) {
  Plant.findById(req.params.id, function (err, plant) {
    if(err) { return handleError(res, err); }
    if(!plant) { return res.send(404); }
    plant.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
