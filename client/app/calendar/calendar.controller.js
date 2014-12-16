'use strict';

angular.module('trellisApp')
	.controller('CalendarCtrl', function ($scope, $modal, Auth, userService) {

		var vm = this;
		$scope.me = Auth.getCurrentUser();

		$scope.date = new Date();
		$scope.date.setDate(1);
    // these could be in providers
    // they could also be arrays, right?
		$scope.days = {
			0: 'Sunday',
			1: 'Monday',
			2: 'Tuesday',
			3: 'Wednesday',
			4: 'Thursday',
			5: 'Friday',
			6: 'Saturday'
		};

		$scope.months = {
			0: 'January',
			1: 'February',
			2: 'March',
			3: 'April',
			4: 'May',
			5: 'June',
			6: 'July',
			7: 'August',
			8: 'September',
			9: 'October',
			10: 'November',
			11: 'December'
		};

		$scope.monthLen = {
			0: 31,
			1: vm.leap,
			2: 31,
			3: 30,
			4: 31,
			5: 30,
			6: 31,
			7: 31,
			8: 30,
			9: 31,
			10: 30,
			11: 31
		};
    //why sometimes scope sometimes vm... its the right thing to do sometimes, but why here
		vm.leap = function(year){
			var year = year || 0;
			if(year%4===0){
				if(year%100!==0){
					return 29;
				} else if(year%400===0){
					return 29
				} else {
					return 28;
				}
			} else {
				return 28;
			}
		};
    // should certainly be in a factory
		var Reminder = function(name, date, notes){
			this.name = name;
			this.date = date;
			this.notes = notes;
		};
    // should be in a factory... also indentation
	    var Day = function(dateNum){
	    	this.date = dateNum;
	    	this.events = [];
	    }

	    var setCalendar = function(m, y){
	    	var month;
	    	var year;
	    	var day;
	    	if(m!==undefined && y!==undefined){
	    		if(m===12){
	    			month = 0;
	    			year = y+1;
	    		} else if(m===-1){
	    			month = 11;
	    			year = y-1;
	    		} else {
	    			month = m;
	    			year = y;
	    		}
	    		$scope.date.setMonth(month);
	    		$scope.date.setFullYear(year);
	    		day = $scope.date.getDay();
	    	} else {
	    		month = $scope.date.getMonth();
	    		year = $scope.date.getFullYear();
	    		day = $scope.date.getDay();
	    	}

	    	var len = function(){
					if(month===1){//If month is February
						return vm.leap(year);
					}
					return $scope.monthLen[month];
				}();

			//Populate weeks arrays with day objects for a given month
			var weeks = function(){
				var w = [];
				var tempArr = [];
				for(var i=0, d=day; i<len; i++, d++){
					var date = new Day(i+1);
					$scope.me.importantDates.forEach(function(el){
            // lines like this benefit from helper functions
            // they're just really hard to get what's going on.
            // could be like if(isInRange(month,year,day) or something...
						if(el.date.getMonth()===month&&el.date.getFullYear()===year&&el.date.getDate()===i+1) date.events.push(el);
					});
					if(d<7){
						tempArr.push(date);
					} else {
						w.push(tempArr);
						tempArr = [];
						d = 0;
						tempArr.push(date);
					}
				}
				if(tempArr.length > 0){
					w.push(tempArr);
					tempArr = [];
				}
				/** 
				 *	Will be used to make empty td elements in the first week
				 *  so that, if the week is less than 7 days, the other days don't
				 *  shift over to the left of the calendar
				 */
				while(w[0].length<7)
					w[0].unshift({date: 'empty'});
				return w;
			}();

			return {day: day, month: month, weeks: weeks, year: year};
		};

		vm.setCal = function(month, year){
			$scope.cal = setCalendar(month, year);
		};
		vm.setCal();

		vm.checkEvent = function(date, impEvent){
			if(date.date===impEvent.date.getDate() && $scope.cal.month===impEvent.date.getMonth() && $scope.cal.year===impEvent.date.getFullYear()) return true;
		}

		vm.setReminder = function(year, month, date, notes, name){
			var hours = $scope.time.getHours();
			var minutes = $scope.time.getMinutes();
			var newDate = new Date(year, month, date, hours, minutes);
			console.log("This is the new date: ", newDate);
			var newEvent = new Reminder(name, newDate, notes);
			$scope.me.importantDates.push(newEvent);
			userService.updateUser($scope.me, function(data){
				$scope.me = Auth.getCurrentUser();
				console.log($scope.me.importantDates);
			});
			delete $scope.modalData;
			vm.setCal(month, year);
		};

		vm.showModal = function(day, month, date, year){
			if(date==='empty') return inactive;
			$scope.modalData = {day: day, date: date, month: month, year: year};
			var calModal = $modal({scope: $scope, template: "/app/calendar/calModal.html", title: day+", "+(month+1)+"/"+date+"/"+year, show: true});
			$scope.time = new Date();
			//Initial minute for reminder time picker will be the next minute that is a multiple of 5 at the moment the time picker was clicked
			$scope.time.setMinutes(Math.ceil(($scope.time.getMinutes())/5)*5);
		};

		vm.showDateModal = function(day, month, date, year, notes, name, eventDate){
			console.log(eventDate);
			$scope.modalData = {day: day, date: date, month: month, year: year, notes: notes, name: name, eventDate: eventDate};
			var calModal = $modal({scope: $scope, template: "/app/calendar/dateModal.html", title: day+", "+(month+1)+"/"+date+"/"+year, show: true});
			$scope.time = new Date(year, month, date);
			//Initial minute for reminder time picker will be the next minute that is a multiple of 5 at the moment the time picker was clicked
			$scope.time.setMinutes(Math.ceil(($scope.time.getMinutes())/5)*5);
		};
	});
