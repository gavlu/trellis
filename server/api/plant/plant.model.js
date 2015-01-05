'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    User     = require('../user/user.model'),
    config   = require('../../config/environment');
    //Extend plants from users in the future
    // extend = require('mongoose-schema-extend');

var PlantSchema = new Schema({
  picture: String,
  name: String,

  // Changed to array from String
  phones: [String],                                /**** NOTE: make required for search purposes? ****/
  email: {
    type: String,
    lowercase: true
  },     /**** NOTE: make required for search purposes? ****/
  age: Number,
  hometown: String,
  currentCity: String,
  reminders: [String],

  // Added "status" field
  relationship: {
    status: String,
    partner: String
  },
  family: [{
    name: String,
    relation: String
  }],
  education: [{                                 /**** NOTE: Can we use Foursquare or some other places API? ****/
    level: String,
    name: String,
  }],

  // Changed object from "employer" to "employment"
      // Added 'employer' and 'position' fields
  employment: {
    employer: String,
    position: String
  },                                            /**** NOTE: Can we use Foursquare or some other places API? ****/

  importantDates: [{
    eventName: String,
    date: Date,
    description: String
  }],

  interests: [{
    type: String,
    tags: [String]
  }],
  projects: [{
    type: String,
    name: String,
    description: String,
    link: String
  }],
  notes: {
    body: String
  },
  otherFields: [{
    title: String,
    body: String
  }],

  // Added contact frequency
  contactFrequency: {
    recurrence_start: {
      type: Date,
      default: Date.now()
    },
    recurrence_end: Date,
    schedule: { type: Object },
    // timesPer: String,
  },

  dateAdded: {
  	type: Date,
  	default: Date.now()
  },
  userId: String,

  // Added ownerId
  ownerId: String
});

// Checks for newness before the plant is saved.
PlantSchema.pre('save', function( next ){
  this.wasNew = this.isNew;
  next();
});

// If the plant is new then it will send the email to the owner.
PlantSchema.post('save', function( plant ){
    function sendEmail(to, subject, text){
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
  if ( plant.wasNew ) {
    User.findById(plant.ownerId, function(err, user){
      if ( err ) throw err;
      sendEmail(user.email,
        'You have a new plant to tend to!',
        'Tend to your plant and make sure it gets an adequate amount of attention so that ' + plant.name + ' can grow strong!'
      );
    });
  }
});

module.exports = mongoose.model('Plant', PlantSchema);
