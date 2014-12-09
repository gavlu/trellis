'use strict';

angular.module('trellisApp')
  	.controller('CalendarCtrl', function ($scope, $modal) {

  		$scope.date = new Date();
  		$scope.date.setDate(1);

		$scope.days = {
			0: 'Sunday',
			1: 'Monday',
			2: 'Tuesday',
			3: 'Wednesday',
			4: 'Thursday',
			5: 'Friday',
			6: 'Saturday'
		}

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
		}

		$scope.leap = function(year){
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
		};

		$scope.monthLen = {
			0: 31,
			1: $scope.leap,
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



		$scope.setCal = function(month, year){
			$scope.cal = setCalendar(month, year);
		};

		var setCalendar = function(m, y){
			var month;
			var year;
			var day;
			var date;
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
				date = $scope.date.getDate();
			} else {
				month = $scope.date.getMonth();
				year = $scope.date.getFullYear();
				day = $scope.date.getDay();
			}
			
			var len = function(){
				if(month===1){
					return $scope.monthLen[month](year);
				}
				return $scope.monthLen[month];
			}();
			var weeks = function(){
				var w = [];
				var tempArr = [];
				for(var i=0, d=day; i<len; i++, d++){
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
			}();
			return {day: day, date: date, month: month, weeks: weeks, year: year};
		}

		$scope.setCal();

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
