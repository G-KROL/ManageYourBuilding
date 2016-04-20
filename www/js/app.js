// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('smarthome', ['ngCordova', 'ionic', 'smarthome.controllers', 'ionic-datepicker'])

  .run(function ($ionicPlatform, $rootScope, $cordovaSplashscreen) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
    	 setTimeout(function() {
    	        $cordovaSplashscreen.hide()
    	    }, 3000);
    	
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
	 
    });
  })
  
  .config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})


.directive('moveSensor', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/sensors/move-sensor.html',
      controller: ['$scope', 'movementSrvc', '$ionicModal', function ($scope, movementSrvc) {
        lastMovement();

        this.refresh = lastMovement;

        var that = this;

        function lastMovement() {
          movementSrvc.last().success(function (data) {
            that.lastDetect = !_.isNull(data.time) ? moment(data.time).toDate() : undefined;
          });
        }

        this.loadHistory = function (day) {
          return movementSrvc.day(day);
        };
        this.loadCsvHistory = function (day) {
          return movementSrvc.dayCsv(day);
        };
        this.introduce = function () {
          return "moveSensor";
        }
      }],
      controllerAs: "moveCtrl"
    }
  })

  .directive('doorSensor', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/sensors/door-sensor.html',
      controller: ['$scope', 'doorSrvc', function ($scope, doorSrvc) {
        lastOpen();

        this.refresh = lastOpen;

        var that = this;

        function lastOpen() {
          doorSrvc.lastOpen().success(function (data) {
            that.lastOpen = !_.isNull(data.time) ? moment(data.time).toDate() : undefined;
          })
        }

        this.loadHistory = function (day) {
          return doorSrvc.day(day);
        };
        this.loadCsvHistory = function (day) {
          return doorSrvc.dayCsv(day);
        };
        this.introduce = function () {
          return "doorSensor";
        }
      }],
      controllerAs: 'doorCtrl'
    }
  })

  .directive('tempBmp180Sensor', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/sensors/temp-bmp180-sensor.html',
      controller: ['$scope', 'tempBmp180Srvc', function ($scope, tempSrvc) {
        tempInCelsius();

        this.refresh = tempInCelsius;

        var that = this;

        function tempInCelsius() {
          tempSrvc.temp().success(function (data) {
            that.tempCelsius = data.value;
          })
        }

        this.loadHistory = function (day) {
          return tempSrvc.day(day);
        };
        this.loadCsvHistory = function (day) {
          return tempSrvc.dayCsv(day);
        };
        this.introduce = function () {
          return "tempBmp180Sensor";
        }
      }],
      controllerAs: 'tempCtrl180'
    }
  })


  .directive('tempMcp9808Sensor', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/sensors/temp-mcp9808-sensor.html',
      controller: ['$scope', 'tempMcp9808Srvc', function ($scope, tempSrvc) {
        tempInCelsius();

        this.refresh = tempInCelsius;

        var that = this;

        function tempInCelsius() {
          tempSrvc.temp().success(function (data) {
            that.tempCelsius = data.value;
          })
        }

        this.loadHistory = function (day) {
          return tempSrvc.day(day);
        };
        this.loadCsvHistory = function (day) {
          return tempSrvc.dayCsv(day);
        };
        this.introduce = function () {
          return "tempMcp9808Sensor";
        }
      }],
      controllerAs: 'tempCtrl9808'
    }
  })

  .directive('pressureSensor', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/sensors/pressure-sensor.html',
      controller: ['$scope', 'pressSrvc', function ($scope, pressSrvc) {
        pressurehPa();

        this.refresh = pressurehPa;

        var that = this;

        function pressurehPa() {
          pressSrvc.readhPa().success(function (data) {
            that.pressurehPa = data.value;
          })
        }

        this.loadHistory = function (day) {
          return pressSrvc.day(day);
        };
        this.loadCsvHistory = function (day) {
          return pressSrvc.dayCsv(day);
        };
        this.introduce = function () {
          return "pressureSensor";
        }
      }],
      controllerAs: 'pressCtrl'
    }
  })

  .directive('attitudeSensor', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/sensors/attitude-sensor.html',
      controller: ['$scope', 'attSrvc', function ($scope, attSrvc) {
        attMeter();

        this.refresh = attMeter;

        var that = this;

        function attMeter() {
          attSrvc.readMeter().success(function (data) {
            that.attitudeMeter = data.value;
          })
        }

        this.loadHistory = function (day) {
          return attSrvc.day(day);
        };
        this.loadCsvHistory = function (day) {
          return attSrvc.dayCsv(day);
        };
        this.introduce = function () {
          return "attitudeSensor";
        }
      }],
      controllerAs: 'attCtrl'
    }
  })

  .directive('lightIntensitySensor', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/sensors/light-intensity-sensor.html',
      controller: ['$scope', 'lightIntSrvc', function ($scope, lightIntSrvc) {
        lightIntLx();

        this.refresh = lightIntLx;

        var that = this;

        function lightIntLx() {
          lightIntSrvc.readLx().success(function (data) {
            that.lightIntensityLx = data.value;
          })
        }

        this.loadHistory = function (day) {
          return lightIntSrvc.day(day);
        };
        this.loadCsvHistory = function (day) {
          return lightIntSrvc.dayCsv(day);
        };
        this.introduce = function () {
          return "lightIntensitySensor";
        }
      }],
      controllerAs: 'lightIntensityCtrl'
    }
  })

  .directive('lightRelay', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/toggles/light-relay.html',
      controller: ['lightRelaySrvc', function (lightRelaySrvc) {
        this.status = 'OFF';

        this.change = change;

        read();

        var that = this;

        function read() {
          lightRelaySrvc.status().success(function (data) {
            that.status = data.relayState;
          });
        }

        function change() {
          lightRelaySrvc.change(that.status).success(function (data) {
            that.status = data.relayState;
          })
        }
      }],
      controllerAs: 'lightRelayCtrl'
    }
  })

  .directive('electricalOutletRelay', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/toggles/electrical-outlet-relay.html',
      controller: ['electricalOutletRelaySrvc', function (electricalOutletRelaySrvc) {
        this.status = 'OFF';

        this.change = change;

        read();

        var that = this;

        function read() {
          electricalOutletRelaySrvc.status().success(function (data) {
            that.status = data.relayState;
          });
        }

        function change() {
          electricalOutletRelaySrvc.change(that.status).success(function (data) {
            that.status = data.relayState;
          })
        }
      }],
      controllerAs: 'electricalOutletRelayCtrl'
    }
  })
  
  .factory(
		'movementSrvc',
		[
				'$http',
				'apiEndPoint',
				function($http, apiEndPoint) {
					return {
						last : function() {
							return $http.get(apiEndPoint + '/movement/last');
						},
						day : function(moment) {
							return $http.get(apiEndPoint + '/movement/'
									+ moment.format('YYYY-MM-DD'));
						},
						dayCsv : function(moment) {
							return apiEndPoint + '/movement/csv/'
									+ moment.format('YYYY-MM-DD');
						}
					}
				} ])

.factory(
		'doorSrvc',
		[
				'$http',
				'apiEndPoint',
				function($http, apiEndPoint) {
					return {
						lastOpen : function() {
							return $http.get(apiEndPoint + '/door/lastOpen');
						},
						day : function(moment) {
							return $http.get(apiEndPoint + '/door/'
									+ moment.format('YYYY-MM-DD'));
						},
						dayCsv : function(moment) {
							return apiEndPoint + '/door/csv/'
									+ moment.format('YYYY-MM-DD');
						}
					}
				} ])

.factory(
		'tempBmp180Srvc',
		[
				'$http',
				'apiEndPoint',
				function($http, apiEndPoint) {
					return {
						temp : function() {
							return $http.get(apiEndPoint
									+ '/temperatureBmp180/celsius');
						},
						day : function(moment) {
							return $http.get(apiEndPoint
									+ '/temperatureBmp180/'
									+ moment.format('YYYY-MM-DD'));
						},
						dayCsv : function(moment) {
							return apiEndPoint + '/temperatureBmp180/csv/'
									+ moment.format('YYYY-MM-DD');
						}
					}
				} ])

.factory(
		'tempMcp9808Srvc',
		[
				'$http',
				'apiEndPoint',
				function($http, apiEndPoint) {
					return {
						temp : function() {
							return $http.get(apiEndPoint
									+ '/temperatureMcp9808/celsius');
						},
						day : function(moment) {
							return $http.get(apiEndPoint
									+ '/temperatureMcp9808/'
									+ moment.format('YYYY-MM-DD'));
						},
						dayCsv : function(moment) {
							return apiEndPoint + '/temperatureBmp180/csv/'
									+ moment.format('YYYY-MM-DD');
						}
					}
				} ])

.factory(
		'pressSrvc',
		[
				'$http',
				'apiEndPoint',
				function($http, apiEndPoint) {
					return {
						readhPa : function() {
							return $http.get(apiEndPoint + '/pressure/hPa');
						},
						day : function(moment) {
							return $http.get(apiEndPoint + '/pressure/'
									+ moment.format('YYYY-MM-DD'));
						},
						dayCsv : function(moment) {
							return apiEndPoint + '/pressure/csv/'
									+ moment.format('YYYY-MM-DD');
						}
					}
				} ])

.factory(
		'attSrvc',
		[
				'$http',
				'apiEndPoint',
				function($http, apiEndPoint) {
					return {
						readMeter : function() {
							return $http.get(apiEndPoint + '/attitude/meter');
						},
						day : function(moment) {
							return $http.get(apiEndPoint + '/attitude/'
									+ moment.format('YYYY-MM-DD'));
						},
						dayCsv : function(moment) {
							return apiEndPoint + '/attitude/csv/'
									+ moment.format('YYYY-MM-DD');
						}
					}
				} ])

.factory(
		'lightIntSrvc',
		[
				'$http',
				'apiEndPoint',
				function($http, apiEndPoint) {
					return {
						readLx : function() {
							return $http.get(apiEndPoint + '/lightsensor/lx');
						},
						day : function(moment) {
							return $http.get(apiEndPoint + '/lightsensor/'
									+ moment.format('YYYY-MM-DD'));
						},
						dayCsv : function(moment) {
							return apiEndPoint + '/lightsensor/csv/'
									+ moment.format('YYYY-MM-DD');
						}
					}
				} ])

.factory('lightRelaySrvc',
		[ '$http', 'apiEndPoint', function($http, apiEndPoint) {
			var url = apiEndPoint + '/lightrelay';
			return {
				status : function() {
					return $http.get(url);
				},
				change : function(newState) {
					return $http.put(url, {
						'relayState' : newState
					});
				}
			}
		} ])

.factory('electricalOutletRelaySrvc',
		[ '$http', 'apiEndPoint', function($http, apiEndPoint) {
			var url = apiEndPoint + '/electricaloutletrelay';
			return {
				status : function() {
					return $http.get(url);
				},
				change : function(newState) {
					return $http.put(url, {
						'relayState' : newState
					});
				}
			}
		} ])

  
  
  

 
  
  
  .constant('apiEndPoint', 'http://192.168.1.17:8080/pi-server')

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('tabsController.home', {
        url: '/home',
        views: {
        'tab1': {
        templateUrl: 'templates/home.html',
        
        }
      	}
        })

  .state('tabsController.manageYourBuilding', {
    url: '/manage',
    views: {
      'tab2': {
        templateUrl: 'templates/manageYourBuilding.html',
        
      }
    }
  })
  
  .state('tabsController.about', {
	    url: '/about',
	    views: {
	      'tab3': {
	        templateUrl: 'templates/about.html',
	        
	      }
	    }
	  })
	  
	   .state('tabsController', {
    url: '/tabs',
    templateUrl: 'templates/tabsController.html',
    abstract:true,

  })

    .state('tabsController.lobby', {
    url: '/lobby',
    views: {
      'tab2': {
        templateUrl: 'templates/lobby.html',
        controller: 'AppCtrl'
      }
    }
  })
     .state('tabsController.coffe', {
    url: '/coffe',
    views: {
      'tab2': {
        templateUrl: 'templates/coffe.html',
        controller: 'AppCtrl'
      }
    }
  })
  
     .state('tabsController.conference', {
    url: '/conference',
    views: {
      'tab2': {
        templateUrl: 'templates/conference.html',
        controller: 'AppCtrl'
      }
    }
  })
  
     .state('tabsController.mail', {
    url: '/mail',
    views: {
      'tab2': {
        templateUrl: 'templates/mail.html',
        controller: 'AppCtrl'
      }
    }
  })
  
     .state('tabsController.reception', {
    url: '/reception',
    views: {
      'tab2': {
        templateUrl: 'templates/reception.html',
        controller: 'AppCtrl'
      }
    }
  })
  
       .state('tabsController.rest', {
    url: '/rest',
    views: {
      'tab2': {
        templateUrl: 'templates/rest.html',
        controller: 'AppCtrl'
      }
    }
  })  
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tabs/home');
  });

  



