flickmiApp.controller('indexController', function($http, $scope, $rootScope,mainInfoFactory) {
	$scope.server=mainInfoFactory.getServerName();
	$scope.port=mainInfoFactory.getPort();
	$scope.protocol=mainInfoFactory.getProtocol();
	$scope.mainurl=$scope.protocol+'://'+$scope.server+'/'

	var url=$scope.mainurl+'search?q=registeredMembers&dateRange=day';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawLineChart(data.results,'registeredMemChart');
		$('#registeredMemChart').parent().parent().find('header ul li').first().addClass('active');

	});
	var url=$scope.mainurl+'search?q=registeredMembers&dateRange=month';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawBarChart(data.results,'breadCrumbRegMemChart');
	});
	var url=$scope.mainurl+'search?q=contactsShared&dateRange=day';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawLineChart(data.results,'contactsSharedChart');
		$('#contactsSharedChart').parent().parent().find('header ul li').first().addClass('active');
	});

	$scope.getChartData=function(daterange,searchquery,chartId){
		var dropDownText=$(event.target).text();
		$('#'+chartId).parent().parent().find('header ul li').removeClass('active');
		$('#'+chartId).parent().parent().find('header .dropdown-toggle').html(dropDownText+ ' <i class="fa fa-caret-down"></i>');
		$(event.target).parent().addClass('active');
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
	$scope.getBarChartData=function(daterange,searchquery,chartId){
		console.log(daterange);
		if(daterange!=null ){
			var url=$scope.mainurl+'search?q='+searchquery+'&dateRange='+daterange;
			$http({
				method : "GET",
				url : url,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data, status, headers, config) {
				drawBarChart(data.results,chartId);
				//console.log('data',data);
			});
		}

	};
	$scope.getFunnelChartData=function(daterange,searchquery,chartId){
		console.log(daterange);
		if(daterange!=null ){
			var url=$scope.mainurl+'search?q='+searchquery+'&dateRange='+daterange;
			$http({
				method : "GET",
				url : url,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data, status, headers, config) {
				drawFunnelChart(data,chartId);
				//console.log('data',data);
			});
		}

	};


});



