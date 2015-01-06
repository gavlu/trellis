'use strict';

angular.module('trellisApp')
  .factory('contactFrequency', function () {
    
    var frequency = [
      { value: 'daily', label: "Daily" }, 
      { value: 'weekly', label: "Week" }, 
      { value: 'monthly', label: "Month" }, 
      // { value: 'yearly', label: "Year" }
    ];

    var days = [
      { value: 1, label: "Sunday" }, 
      { value: 2, label: "Monday" }, 
      { value: 3, label: "Tuesday" }, 
      { value: 4, label: "Wednesday" }, 
      { value: 5, label: "Thursday" },
      { value: 6, label: "Friday" },
      { value: 7, label: "Saturday" }, 
    ];

    var weeks = [
      { value: 1, label: "First"},
      { value: 2, label: "Second"},
      { value: 3, label: "Third"},
      { value: 4, label: "Fourth"},
      { value: 0, label: "Last" }
    ];

    // Create frequency data
    var sched = {schedules: [{}]};

    return {
      buildSchedule: function (weeks, days, timeOfDay) {
        if(weeks.length > 0 && days.length > 0){
          sched.schedules[0].dc = weeks;
          sched.schedules[0].dw = days;
          sched.schedules[0].h = [timeOfDay.getHours()];
          sched.schedules[0].m = [timeOfDay.getMinutes()];
        } 
        else if (days.length > 0) {
          console.log("Weekly", timeOfDay)
          sched.schedules[0].dw = days;
          sched.schedules[0].h = [timeOfDay.getHours()];
          sched.schedules[0].m = [timeOfDay.getMinutes()];
        } 
        else {
          sched.schedules[0].h = [timeOfDay.getHours()];
          sched.schedules[0].m = [timeOfDay.getMinutes()];
        }
        
        return sched;
      },
      
    frequency: frequency,
    days: days,
    weeks: weeks
    
    };
  });