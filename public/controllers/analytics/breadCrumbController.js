flickmiApp.controller('breadCrumbController', function($http, $scope, $rootScope,mainInfoFactory) {
	$scope.server=mainInfoFactory.getServerName();
	$scope.port=mainInfoFactory.getPort();
	$scope.protocol=mainInfoFactory.getProtocol();
	$scope.mainurl=$scope.protocol+'://'+$scope.server+'/'
	$scope.sparklinedata = '';
	$scope.totalShared = '';
	$scope.totalRegisteredMem = '';
	$scope.active24HrPercent = '';
	$scope.active24Hr = '';
	var url = $scope.mainurl + 'search?q=contactsShared&dateRange=dayevery2hour';// by default show one day data
	$http({
		method: "GET",
		url: url,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function (data, status, headers, config) {
		//$scope.sparklinedata=data.results;
		$scope.totalShared = data.results[0].Total;
		$('.sparkline.contact-shared').text(data.results[0].result);
		var url = $scope.mainurl + 'search?q=registeredMembers&dateRange=dayevery2hour';// by default show one day data
		$http({
			method: "GET",
			url: url,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function (data, status, headers, config) {
			$scope.totalRegisteredMem = data.totalRegMemResults;
			var url = $scope.mainurl + 'search?q=useractivelast24hour';// by default show one day data
			$http({
				method: "GET",
				url: url,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function (data, status, headers, config) {
				$scope.active24HrPercent = data.results[0].active24HourPercentage;
				$scope.active24Hr = data.results[0].active24Hour
				$('.activeusers').attr('data-percent', parseInt(data.results[0].active24HourPercentage.toString().substr(0, 2)));
				$('.activeusers span').text(parseInt(data.results[0].active24HourPercentage.toString().substr(0, 2)));
				runAllCharts();
				$('.sparkline.contact-shared').each(function () {
					var $this = $(this);
					var sparklineType = $this.data('sparkline-type') || 'bar';

					// BAR CHART
					if (sparklineType == 'bar') {

						barColor = $this.data('sparkline-bar-color') || $this.css('color') || '#0000f0';
						sparklineHeight = $this.data('sparkline-height') || '26px';
						sparklineBarWidth = $this.data('sparkline-barwidth') || 5;
						sparklineBarSpacing = $this.data('sparkline-barspacing') || 2;
						sparklineNegBarColor = $this.data('sparkline-negbar-color') || '#A90329';
						sparklineStackedColor = $this.data('sparkline-barstacked-color') || ["#A90329", "#0099c6", "#98AA56", "#da532c", "#4490B1", "#6E9461", "#990099", "#B4CAD3"];

						$this.sparkline('html', {
							barColor: barColor,
							type: sparklineType,
							height: sparklineHeight,
							barWidth: sparklineBarWidth,
							barSpacing: sparklineBarSpacing,
							stackedBarColor: sparklineStackedColor,
							negBarColor: sparklineNegBarColor,
							zeroAxis: 'false'
						});

					}
				});
				var url = $scope.mainurl + 'search?q=accountclosedoropened&dateRange=dayevery2hour';// by default show one day data
				$http({
					method: "GET",
					url: url,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function (data, status, headers, config) {
					var stackedRes = [];
					for (var i = 0; i < data.results[0].accountCreated.length; i++) {
						stackedRes.push(data.results[0].accountCreated[i] + ':' + data.results[1].accountClosed[i])

					}
					console.log('stackedRes', stackedRes);
					var res = '';
					for (var i = 0; i < stackedRes.length; i++) {
						res = res + stackedRes[i];
						if (i + 1 != stackedRes.length)
							res = res + ','
					}
					res = res.toString();

					console.log('stackedRes', res)
					$('.sparkline.account-info').text(res);
					$('.sparkline.account-info').each(function () {
						var $this = $(this);
						var sparklineType = $this.data('sparkline-type') || 'bar';

						// BAR CHART
						if (sparklineType == 'bar') {

							barColor = $this.data('sparkline-bar-color') || $this.css('color') || '#0000f0';
							sparklineHeight = $this.data('sparkline-height') || '26px';
							sparklineBarWidth = $this.data('sparkline-barwidth') || 5;
							sparklineBarSpacing = $this.data('sparkline-barspacing') || 2;
							sparklineNegBarColor = $this.data('sparkline-negbar-color') || '#A90329';
							sparklineStackedColor = $this.data('sparkline-barstacked-color') || ["#A90329", "#0099c6", "#98AA56", "#da532c", "#4490B1", "#6E9461", "#990099", "#B4CAD3"];

							$this.sparkline('html', {
								//barColor: barColor,
								type: sparklineType,
								height: sparklineHeight,
								barWidth: sparklineBarWidth,
								barSpacing: sparklineBarSpacing,
								//stackedBarColor: sparklineStackedColor,
								negBarColor: sparklineNegBarColor,
								zeroAxis: 'false'
							});

						}
					});
				});

			});
		});


	});
});
	