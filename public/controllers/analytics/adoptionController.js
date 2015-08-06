flickmiApp.controller('adoptionController', function($http, $scope, $rootScope,mainInfoFactory) {
	$scope.server=mainInfoFactory.getServerName();
	$scope.port=mainInfoFactory.getPort();
	$scope.protocol=mainInfoFactory.getProtocol();
	console.log(' $scope.fruits = results.fruits', $scope.fruits);
	$scope.mainurl=$scope.protocol+'://'+$scope.server+'/'
	var url=$scope.mainurl+'search?q=totalLogins&dateRange=day';// by default show one day data
	$scope.currentCountry="";
	
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawLineChart(data.results,'totalSigninChart');
		$('#totalSigninChart').parent().parent().find('header ul li').first().addClass('active');
	});
	var url=$scope.mainurl+'search?q=registrationMethod&dateRange=day';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawPieChart(data,'regMethodChart');
		$('#regMethodChart').parent().parent().find('header ul li').first().addClass('active');
	});
	var url=$scope.mainurl+'search?q=device';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawPieChart(data,'deviceChart');
	});
	var url=$scope.mainurl+'search?q=browser';
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawPieChart(data,'browserChart');
	});
	var url=$scope.mainurl+'search?q=accountclosedoropened&dateRange=day';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawLineChart(data.results,'Accountsopenedclosed');
		$('#Accountsopenedclosed').parent().parent().find('header ul li').first().addClass('active');
	});
	var url=$scope.mainurl+'search?q=useractivity';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		groupedBarChart(data.results,'useractivity');
	});
	var url=$scope.mainurl+'search?q=CM_SharedOCR&dateRange=day';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawhorizontalBarChart(data.results,'funnelContainer');
		$('#funnelContainer').parent().parent().find('header ul li').first().addClass('active');
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
	$scope.getPieChartData=function(daterange,searchquery,chartId){
		var dropDownText=$(event.target).text();
		$('#'+chartId).parent().parent().parent().find('header ul li').removeClass('active');
		$('#'+chartId).parent().parent().parent().find('header .dropdown-toggle').html(dropDownText+ ' <i class="fa fa-caret-down"></i>');
		console.log(daterange);
		if(daterange!=null ){
			var url=$scope.mainurl+'search?q='+searchquery+'&dateRange='+daterange;
			$http({
				method : "GET",
				url : url,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data, status, headers, config) {
				drawPieChart(data,chartId);
				//console.log('data',data);
			});
		}

	};
	$scope.getFunnelChartData=function(daterange,searchquery,chartId){
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
				drawhorizontalBarChart(data.results,chartId);
				//console.log('data',data);
			});
		}

	};

});