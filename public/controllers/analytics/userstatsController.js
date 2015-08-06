flickmiApp.controller('userstatsController', function($http, $scope, $rootScope,mainInfoFactory) {
	$scope.server=mainInfoFactory.getServerName();
	$scope.port=mainInfoFactory.getPort();
	$scope.protocol=mainInfoFactory.getProtocol();
	$scope.mainurl=$scope.protocol+'://'+$scope.server+'/'
	var url=$scope.mainurl+'search?q=contactsperuser';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawBarChart(data.results,'contactsPerUser');
	});
	var url=$scope.mainurl+'search?q=personasperuser';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawBarChart(data.results,'personaPerUser');
	});
	var url=$scope.mainurl+'search?q=cardsentperuser';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {
		drawBarChart(data.results,'cardsSentPerUser');
	});

	/*
	 * VECTOR MAP
	 */


	var url=$scope.mainurl+'search?q=getCountryData';// by default show one day data
	$http({
		method : "GET",
		url : url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(data, status, headers, config) {

		var data_array={};
		if(data.results[0]!=undefined){
			for(var i=0;i<data.results[0].values.length;i++){
				var code=data.results[0].values[i].x;
				data_array[codeByCountry[code]]=data.results[0].values[i].y;
			}
		}

		/*
		 * VECTOR MAP
		 */
// Load Map dependency 1 then call for dependency 2
		loadScript("js/plugin/vectormap/jquery-jvectormap-1.2.2.min.js", loadMapFile);

// Load Map dependency 2 then rendeder Map
		function loadMapFile() {
			loadScript("js/plugin/vectormap/jquery-jvectormap-world-mill-en.js", renderVectorMap);
		}

		function renderVectorMap() {
			$('#vector-map').vectorMap({
				map: 'world_mill_en',
				backgroundColor: '#fff',
				regionStyle: {
					initial: {
						fill: '#c4c4c4'
					},
					hover: {
						"fill-opacity": 1
					}
				},
				series: {
					regions: [{
						values: data_array,
						scale: ['#85a8b6', '#4d7686'],
						normalizeFunction: 'polynomial'
					}]
				},
				onRegionClick: function(element, code, region) {
					chartsUpdate(countryByCode[code]);
				},
				onRegionLabelShow: function (e, el, code) {
					if (typeof data_array[code] == 'undefined') {
						e.preventDefault();
					} else {
						var countrylbl = data_array[code];
						el.html(el.html() + ': ' + countrylbl);
					}
				}
			});
		}
	});


	function chartsUpdate(Country){
		console.log('Country',Country);
		$('#contactsPerUser svg g').remove();
		$('#personaPerUser svg g').remove();
		$('#cardsSentPerUser svg g').remove();
		var url=$scope.mainurl+'search?q=contactsperuser&country='+Country;// by default show one day data
		$http({
			method : "GET",
			url : url,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(data, status, headers, config) {
			drawBarChart(data.results,'contactsPerUser');
		});
		var url=$scope.mainurl+'search?q=personasperuser&country='+Country;// by default show one day data
		$http({
			method : "GET",
			url : url,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(data, status, headers, config) {
			drawBarChart(data.results,'personaPerUser');
		});
		var url=$scope.mainurl+'search?q=cardsentperuser&country='+Country;// by default show one day data
		$http({
			method : "GET",
			url : url,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(data, status, headers, config) {
			drawBarChart(data.results,'cardsSentPerUser');
		});

	}
});