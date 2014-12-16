/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

 //seedDB is set to false after the first seed

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Plant = require('../api/plant/plant.model');

Plant.find({}).remove(function(){
  Plant.create({
    name: 'Gavin',
    hometown: 'Staten Island'
  });
});

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
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
    }],
    notes: {
      body: "Great guy"
    },
    otherFields: [{
      title: "Test title",
      body: "Test body"
    },{
      title: "Second title",
      body: "Second body"
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
       notes: {
         body: "Likes languages"
       },
       otherFields: []
     }, 
     function() {

      console.log('finished populating users');
    }
  );
});