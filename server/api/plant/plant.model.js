'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
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
    frequency: String,
    timesPer: String,
    days_of_week: [String]
  },

  dateAdded: {
  	type: Date,
  	default: Date.now()
  },
  userId: String,

  // Added ownerId
  ownerId: String
});

module.exports = mongoose.model('Plant', PlantSchema);