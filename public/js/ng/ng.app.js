var flickmiApp = angular.module('flickmiApp', [
  	'ngRoute',
  	//'ngAnimate', // this is buggy, jarviswidget will not work with ngAnimate :(
  	'ui.bootstrap',
  	'plunker',
  	'app.controllers',
  	'app.demoControllers',
  	'app.main',
  	'app.navigation',
  	'app.localize',
  	'app.activity',
  	'app.smartui'
]);
flickmiApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/dashboard', {
				templateUrl: 'dashboard',
				controller: 'indexController'
			}).
			when('/adoption', {
				templateUrl: 'adoption',
				controller: 'adoptionController'
			}).
			when('/userstats', {
				templateUrl: 'userstats',
				controller: 'userstatsController'
			}).
			when('/personastats', {
				templateUrl: 'personastats',
				controller: 'personastatsController'
			}).
			when('/activity', {
				templateUrl: 'activity',
				controller: 'actiondataController'
			}).

			otherwise({
				redirectTo: '/dashboard'
			});
	}]);



flickmiApp.run(['$rootScope', 'settings', function($rootScope, settings) {
	settings.currentLang = settings.languages[0]; // en
}])


flickmiApp.directive('preventDefaultHref', function () {
	return {
		restrict: 'A',
		link: function(scope, elem, attrs, ctrl){
			elem.bind('click', function (ev) {
				ev.preventDefault();

				if (attrs.href)
					window.location.href = attrs.href;
			});
		}
	};
});

flickmiApp.factory('mainInfoFactory', function($http) {


	var factory = {}; // define factory object

	factory.getServerName = function() { // define method on factory object

		return "10.1.3.82:3010"; // returning data that was pulled in $http call

	};
	factory.getProtocol = function() { // define method on factory object

		return "http"; // returning data that was pulled in $http call

	};
	factory.getPort = function() { // define method on factory object

		return 80; // returning data that was pulled in $http call

	};

	return factory; // returning factory to make it ready to be pulled by the controller

});
