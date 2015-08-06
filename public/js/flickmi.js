var flickmiApp = angular.module('flickmiApp', [ 'ui.bootstrap' ]);

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

        return "10.1.3.96:3010"; // returning data that was pulled in $http call

    };
	factory.getProtocol = function() { // define method on factory object

        return "http"; // returning data that was pulled in $http call

    };
	factory.getPort = function() { // define method on factory object

        return 80; // returning data that was pulled in $http call

    };

    return factory; // returning factory to make it ready to be pulled by the controller

});

