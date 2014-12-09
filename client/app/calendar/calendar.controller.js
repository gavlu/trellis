'use strict';

angular.module('trellisApp')
  	.controller('CalendarCtrl', function ($scope, $modal) {

		$scope.dateObj = new Date();
		$scope.days = {
			0: 'Sunday',
			1: 'Monday',
			2: 'Tuesday',
			3: 'Wednesday',
			4: 'Thursday',
			5: 'Friday',
			6: 'Saturday'
		}

		$scope.notLeap = function(year){
			var year = year || 0;
			if(year%4===0){
				if(year%100!==0){
					return 29;
				} else if(year%400===0){
					return 29;
				} else {
					return 28;
				}
			} else {
				return 28;
			}
		}

		$scope.monthLen = {
			0: 31,
			1: $scope.notLeap(),
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
		}

		//$scope.$apply();


		$scope.setCal = function(day, date, month, year){
			var currDay = day || $scope.dateObj.getDay();
			var currDate = date || $scope.dateObj.getDate();
			var currMonth = month || $scope.dateObj.getMonth();
			var currYear = year || $scope.dateObj.getFullYear();
			var len = $scope.monthLen[currMonth];
			var weeks = function(){
				var w = [];
				var tempArr = [];
				for(var i=0, d=currDay; i<len; i++, d++){
					if(d<7){
						tempArr.push(i+1);
					} else {
						w.push(tempArr);
						tempArr = [];
						d = 0;
						tempArr.push(i+1);
					}
				}
				if(tempArr.length > 0){
					w.push(tempArr);
					tempArr = [];	
				}
				while(w[0].length<7)
					w[0].unshift('');
				console.log(w, 'After tempArr check');
				return w;
			}
			return {day: currDay, date: currDate, month: currMonth, weeks: weeks(), year: currYear};
		}

		$scope.Reminder = function(date, notes){
			this.date = date;
			this.notes = notes;
		}

		$scope.setReminder = function(year, month, date, notes){
			var hours = $scope.time.getHours();
			var minutes = $scope.time.getMinutes();
			var newDate = new Date(year, month, date, hours, minutes);
			var newEvent = new $scope.Reminder(newDate, notes);
			console.log(newEvent);
		}

		$scope.showModal = function(day, month, date, year){
			if(date==='') return inactive;
			var calModal = $modal({scope: $scope, template: "/app/calendar/calModal.html", title: day+", "+month+"/"+date+"/"+year, show: true});
			$scope.time = new Date();
		};

	});
