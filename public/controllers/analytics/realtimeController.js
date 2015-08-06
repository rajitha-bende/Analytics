flickmiApp.controller('realtimeController', ['$scope', '$modal', function ($scope, $modal) {
	$scope.log = [];
	
	var maxLines = 100;
	var socket = io.connect('http://10.1.3.82:3010');
	var eventName = 'event';
	
	socket.on(eventName, function (data) {
		$scope.$apply(function () {
			if ($scope.log.length == maxLines) {
				$scope.log.pop();
				$scope.log.unshift(data);
			}
			else {
				$scope.log.unshift(data);
			}
		});
	});
}]);