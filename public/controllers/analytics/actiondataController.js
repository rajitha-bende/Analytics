flickmiApp.controller('actiondataController', function($http, $scope, $rootScope,mainInfoFactory) {
	$scope.server=mainInfoFactory.getServerName();
	$scope.port=mainInfoFactory.getPort();
	$scope.protocol=mainInfoFactory.getProtocol();
	$scope.mainurl=$scope.protocol+'://'+$scope.server+'/'
	var url=$scope.mainurl+'search?q=contactsShared&dateRange=day';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawLineChart(data.results,'sendContacts');
	});
	var url=$scope.mainurl+'search?q=totalLogins&dateRange=day';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawLineChart(data.results,'signIn');
	});
	var url=$scope.mainurl+'search?q=totalLogouts&dateRange=day';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawLineChart(data.results,'signOut');
	});
	var url=$scope.mainurl+'search?q=createPersona&dateRange=day';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawLineChart(data.results,'createPersona');
	});
	var url=$scope.mainurl+'search?q=editPersona&dateRange=day';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawLineChart(data.results,'editPersona');
	});
	var url=$scope.mainurl+'search?q=deletePersona&dateRange=day';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawLineChart(data.results,'deletePersona');
	});
	var url=$scope.mainurl+'search?q=viewContactsList&dateRange=day';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawLineChart(data.results,'viewContacts');
	});
	var url=$scope.mainurl+'search?q=searchContactsList&dateRange=day';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawLineChart(data.results,'searchContacts');
	});
	var url=$scope.mainurl+'search?q=deleteContact&dateRange=day';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawLineChart(data.results,'deleteContacts');
	});
	$scope.getChartData=function(daterange,searchquery,chartId){
		var dropDownText=$(event.target).text();
		$('#'+chartId).parent().parent().find('header ul li').removeClass('active');
		$('#'+chartId).parent().parent().find('header .dropdown-toggle').html(dropDownText+ ' <i class="fa fa-caret-down"></i>');
		console.log(daterange);
		if(daterange!=null ){
			var url=$scope.mainurl+'search?q='+searchquery+'&dateRange='+daterange;
			$http({
				method : "GET",
				url : url,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data, status, headers, config) {
				drawLineChart(data.results,chartId);
				//console.log('data',data);
			});
		}

	};
});