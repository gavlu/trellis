var CronJob = require('cron').CronJob;
var _ = require('lodash');
// var nodemailer = require('nodemailer');
var config = require('../config/environment');
var auth = require('../auth/auth.service');
var User = require('./user/user.model');
var Plant = require('./plant/plant.model');

var sendEmail = function(options){
  // var options = {
  //   from: 'reminder.trellis@gmail.com',
  //   to: to,
  //   subject: subject,
  //   text: text
  // }
  config.email.transporter.sendMail(options, function(err, info){
    if(err){
      console.log(err);
    }else{
      console.log('Message sent: ' + info.response);
    }
  config.email.transporter.close();
  });
};

var isPast = function(date, currentDate) {
    console.log("isPast, hit");
    console.log("Milliseconds in the past:");
    console.log(date-currentDate);

    if((date-currentDate) <= -86400000){
        console.log("Date should recur");
        return true;
    }

    return false;
}


var job = new CronJob({
	cronTime: '00 00 5,17 * * *',
    onTick: function(){
    	console.log('Date is now: ', Date());
    	console.log('You will see this message twice a day');

        var currentTime = new Date();

    	Plant.find({}, function(err, plants) {
    		plants.forEach(function(plant){
                plant.importantDates.forEach(function(someEvent){
                    console.log("Event date:")
                    console.log(someEvent.date);

                    var eventDate = someEvent.date;
                    if(isPast(eventDate, currentTime)){
                        eventDate.setFullYear(currentTime.getFullYear());
                    };
                    if(((eventDate - currentTime)/(1000*3600*24)) < 0 &&
                        ((eventDate - currentTime)/(1000*3600*24)) > -1){

                        var emailReminders = [];
                        plant.reminders.forEach(function(reminder) {
                            emailReminders += reminder + "\n\t";
                        });

                        console.log(emailReminders);

                        var phoneNum = "";
                        if(!plant.phones[0]) { phoneNum = "No phone number stored for this contact" };

                        User.findById(plant.ownerId, function(err, user){
                            sendEmail({
                                to: user.email,
                                replyTo: plant.email,
                                subject: "Trellis contact: " + plant.name + " | Event Today: " + someEvent.eventName,
                                text: user.name + ", \n\n"
                                    + plant.name + " has an event happening today: \n\t"
                                    + "Event: " + someEvent.eventName + "\n\t"
                                    + "Notes: " + someEvent.description + "\n\n\n"
                                    + "Contact him/her by either: \n\t 1) Replying to this email \n\t 2) Call (or text) at:\n\t\t" + phoneNum + "\n\n"
                                    + "And don't forget! You wanted to remind them about: \n\n\t" + emailReminders + "\n\n\n\n"
                                    + "More information or to update: \n\t http://localhost:9000/trellis"

                           });
                        })
                    };

                    console.log("-------------------")

                })



                console.log("----------------------------------")
            })
    	})
	},
	onComplete: null,
	start: true,
	timeZone: "America/New_York"
});