flickmiApp.controller('personastatsController', function($http, $scope, $rootScope,mainInfoFactory) {
	$scope.server=mainInfoFactory.getServerName();
	$scope.port=mainInfoFactory.getPort();
	$scope.protocol=mainInfoFactory.getProtocol();
	$scope.mainurl=$scope.protocol+'://'+$scope.server+'/'
	var url=$scope.mainurl+'search?q=commonlysharedPersona&limit=10&offset=0';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawhorizontalBarChart(data.results,'commonlysharedpersona');
		$scope.totalItems = data.total;
		$scope.currentPage = 1;
	});
	$scope.selectPage = function (pageNo) {
		var offset;
		$scope.currentPage = pageNo;

	};

	$scope.pageChanged = function() {
		console.log('Page changed to: ' + $scope.currentPage);

	};
	$scope.setPage = function() {
		console.log('Page changed to: ' +$scope.currentPage);
		offset=($scope.currentPage-1)*10;
		var url=$scope.mainurl+'search?q=commonlysharedPersona&limit=10&offset='+offset;// by default show one day data
		$http({
			method : "GET",
			url : url,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(data, status, headers, config) {
			drawhorizontalBarChart(data.results,'commonlysharedpersona');
		});
	};
	var url=$scope.mainurl+'search?q=firstPersona';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawhorizontalBarChart(data.results,'commonlyfirstpersona');
	});
	var url=$scope.mainurl+'search?q=secondPersona';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawhorizontalBarChart(data.results,'commonlysecondpersona');
	});
	var url=$scope.mainurl+'search?q=thirdPersona';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawhorizontalBarChart(data.results,'commonlythirdpersona');
	});
	var url=$scope.mainurl+'search?q=detailPersona';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawhorizontalBarChart(data.results,'detailinclusion');
	});

	var url=$scope.mainurl+'search?q=personasperuser';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawBarChart(data.results,'personaPerUser');
	});
});