'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    //Extend plants from users in the future
    // extend = require('mongoose-schema-extend');

var PlantSchema = new Schema({
  picture: { type: String },
  name: { type: String },

  // Changed to array from String
  phones: [String],                                /**** NOTE: make required for search purposes? ****/
  email: { type: String, lowercase: true },     /**** NOTE: make required for search purposes? ****/
  age: { type: Number },
  hometown: { type: String },
  currentCity: { type: String },
  reminders: { type: [String] },

  // Added "status" field
  relationship: {
    status: { type: String },
    partner: { type: String }
  },
  family: [{
    name: { type: String },
    relation: { type: String }
  }],
  education: [{                                 /**** NOTE: Can we use Foursquare or some other places API? ****/
    level: { type: String },
    name: { type: String },
  }],

  // Changed object from "employer" to "employment"
      // Added 'employer' and 'position' fields
  employment: { 
    employer: String,
    position: String 
  },                                            /**** NOTE: Can we use Foursquare or some other places API? ****/
  
  importantDates: [{ 
    eventName: { type: String },
    date: { type: Date },
    description: { type: String  }
  }],
  
  interests: [{ 
    type: { type: String },
    tags: { type: [String] }
  }],                  
  projects: [{
    type: { type: String },
    name: { type: String },
    description: { type: String },
    link: { type: String }
  }],
  notes: {
    body: { type: String }
  },
  otherFields: [{
    title: { type: String },
    body: { type: String }
  }],

  // Added contact frequency
  contactFrequency: { type: String },
  dateAdded: {
  	type: Date,
  	default: Date.now()
  },
  userId: { type: String },

  // Added ownerId
  ownerId: { type: String }
});

module.exports = mongoose.model('Plant', PlantSchema);