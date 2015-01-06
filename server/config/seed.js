/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

 //seedDB is set to false after the first seed

'use strict';

var User = require('../api/user/user.model');
var Plant = require('../api/plant/plant.model');

Plant.find({}).remove(function(){
  Plant.create({
    name: 'Gavin',
    hometown: 'Staten Island'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    name: 'Moe',
    email: 'moe@stooges.com',
    password: 'test',
    age: '25',
    hometown: 'Hollywood, CA',
    currentCity: 'Somewhere, NE',
    projects: [{
      type: "Performance",
      name: "Film",
      description: "Makes movies",
      link: "none"
    }],

  }, {
    provider: 'local',
    name: 'Larry',
    email: 'larry@stooges.com',
    password: 'test'
  }, {
    provider: 'local',
    name: 'Curly',
    email: 'curly@stooges.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, {
    provider: 'local',
    name: 'Brendhan Haas',
    email: 'bhaas@gmail.com',
    password: 'bhaas',
    phone: '2032585619',
    age: '25',
    hometown: 'Fairfield, CT',
    currentCity: 'Norwalk, CT',
    relationship: {
      partner: 'Christina Whittaker'
    },
    family: [{
      name: 'Jim',
      relation: 'father'
    },{
      name: 'Bailey',
      relation: 'mother'
    },{
      name: 'Dylan',
      relation: 'brother'
    },{
      name: 'Galen',
      relation: 'sister'
    }],
    education: [{
      level: "High School",
      name: "Greens Farms Academy"
    },{
      level: "College",
      name: "Georgetown University"
    }],
    employer: "AIG",
    interests: [{
      type: "Video games",
      tags: ["halo", "call of duty", "red dead redemption", "xbox"]
    },{
      type: "Beer",
      tags: ["brewing", "drinking", "IPA", "craft"]
    }],
    projects: [{
      type: "Offline",
      name: "Home brewing",
      description: "Brewing a batch of cider in his closet",
      link: "none"
    }]
  }, {
       provider: 'local',
       name: 'Gavin Lue',
       email: 'gavinlue@gmail.com',
       password: 'gavinlikesdogs',
       phone: '718-483-6772',
       age: '23',
       hometown: 'Staten Island, NY',
       currentCity: 'Staten Island, NY',
       relationship: {
         partner: ''
       },
       family: [{
         name: 'Peter',
         relation: 'Father'
       },{
         name: 'Jackie',
         relation: 'Mother'
       },{
         name: 'Mathieu',
         relation: 'Brother'
       },{
         name: 'Ana',
         relation: 'Sister'
       }],
       education: [{
         level: "High School",
         name: "Xavier High School"
       },{
         level: "College",
         name: "Macaulay Honors College"
       }],
       employer: "",
       importantDates: [],
       interests: [{
         type: "Video games",
         tags: ["Mass Effect", "Final Fantasy", "Borderlands", "Playstation"]
       }],
       projects: [],
       notes: "Likes languages"
     },
     function() {
      console.log('finished populating users');
     }
  );
});