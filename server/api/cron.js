var CronJob = require('cron').CronJob;
var _ = require('lodash');
var nodemailer = require('nodemailer');
var auth = require('../auth/auth.service');
var User = require('./user/user.model');
var Plant = require('../api/plant/plant.model');


var primary = auth.isAuthenticated();
var job = new CronJob({
	cronTime: '*/15 * * * * *',
    onTick: function(){
    	console.log('Date is now: ', Date());
    	console.log('You will see this message every 15 seconds');
    	console.log(primary.name);
    	User.findOne(primary._id, function(err, user) {
    		console.log(user);
    	})
	}, 
	onComplete: null, 
	start: true, 
	timeZone: "America/New_York"
});