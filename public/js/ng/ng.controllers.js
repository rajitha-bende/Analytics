angular.module('app.controllers', [])
	.factory('settings', ['$rootScope', function($rootScope){
		// supported languages
		
		var settings = {
			languages: [
				{
					language: 'English',
					translation: 'English',
					langCode: 'en',
					flagCode: 'us'
				},
				{
					language: 'Espanish',
					translation: 'Espanish',
					langCode: 'es',
					flagCode: 'es'
				},
				{
					language: 'German',
					translation: 'Deutsch',
					langCode: 'de',
					flagCode: 'de'
				},
				{
					language: 'Korean',
					translation: '한국의',
					langCode: 'ko',
					flagCode: 'kr'
				},
				{
					language: 'French',
					translation: 'français',
					langCode: 'fr',
					flagCode: 'fr'
				},
				{
					language: 'Portuguese',
					translation: 'português',
					langCode: 'pt',
					flagCode: 'br'
				},
				{
					language: 'Russian',
					translation: 'русский',
					langCode: 'ru',
					flagCode: 'ru'
				},
				{
					language: 'Chinese',
					translation: '中國的',
					langCode: 'zh',
					flagCode: 'cn'
				}
			]
			
		};

		return settings;
		
	}])
	
	.controller('PageViewController', ['$scope', '$route', '$animate', function($scope, $route, $animate) {
		// controler of the dynamically loaded views, for DEMO purposes only.
		/*$scope.$on('$viewContentLoaded', function() {
			
		});*/
	}])
	.controller('SmartAppController', function($http, $scope, $rootScope,mainInfoFactory) {
		
			
		})


	.controller('LangController', ['$scope', 'settings', 'localize', function($scope, settings, localize) {
		$scope.languages = settings.languages;
		$scope.currentLang = settings.currentLang;
		$scope.setLang = function(lang) {
			settings.currentLang = lang;
			$scope.currentLang = lang;
			localize.setLang(lang);
		}

		// set the default language
		$scope.setLang($scope.currentLang);

	}])
	
;

angular.module('app.demoControllers', [])
	.controller('WidgetDemoCtrl', ['$scope', '$sce', function($scope, $sce) {
		$scope.title = 'SmartUI Widget';
		$scope.icon = 'fa fa-user';
		$scope.toolbars = [
			$sce.trustAsHtml('<div class="label label-success">\
				<i class="fa fa-arrow-up"></i> 2.35%\
			</div>'),
			$sce.trustAsHtml('<div class="btn-group" data-toggle="buttons">\
		        <label class="btn btn-default btn-xs active">\
		          <input type="radio" name="style-a1" id="style-a1"> <i class="fa fa-play"></i>\
		        </label>\
		        <label class="btn btn-default btn-xs">\
		          <input type="radio" name="style-a2" id="style-a2"> <i class="fa fa-pause"></i>\
		        </label>\
		        <label class="btn btn-default btn-xs">\
		          <input type="radio" name="style-a2" id="style-a3"> <i class="fa fa-stop"></i>\
		        </label>\
		    </div>')
		];

		$scope.content = $sce.trustAsHtml('\
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\
						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\
						proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
	}])

	.controller('ActivityDemoCtrl', ['$scope', function($scope) {
		var ctrl = this;
		ctrl.getDate = function() {
			return new Date().toUTCString();
		};

		$scope.refreshCallback = function(contentScope, done) {

			// use contentScope to get access with activityContent directive's Control Scope
			console.log(contentScope);

			// for example getting your very long data ...........
			setTimeout(function() {
				done();
			}, 3000);

			$scope.footerContent = ctrl.getDate();
		};

		$scope.items = [
			{
				title: 'Msgs',
				count: 14, 
				src: 'ajax/notify/mail.html',
				onload: function(item) {
					console.log(item);
					alert('[Callback] Loading Messages ...');
				}
			},
			{
				title: 'Notify',
				count: 3,
				src: 'ajax/notify/notifications.html'
			},
			{
				title: 'Tasks',
				count: 4,
				src: 'ajax/notify/tasks.html',
				//active: true
			}
		];

		$scope.total = 0;
		angular.forEach($scope.items, function(item) {
			$scope.total += item.count;
		})

		$scope.footerContent = ctrl.getDate();
		
	}])
;
function runAllCharts() {
	if ($.fn.easyPieChart) {

		$('.easy-pie-chart').each(function () {
			var $this = $(this);
			var barColor = $this.css('color') || $this.data('pie-color'),
				trackColor = $this.data('pie-track-color') || '#fff',
				size = parseInt($this.data('pie-size')) || 25;

			$this.easyPieChart({

				barColor: barColor,
				trackColor: trackColor,
				scaleColor: false,
				lineCap: 'butt',
				lineWidth: parseInt(size / 8.5),
				animate: 1500,
				rotate: -90,
				size: size,
				onStep: function (value) {
					this.$el.find('span').text();
				}

			});
		});

	} // end if
}
function drawLineChart(data,chartId){
	var chart;
	if(chartId == "Accountsopenedclosed"){
		dateRange = data[0].dateRange;
		dateRange = data[1].dateRange;
	}
	nv.addGraph(function() {
		chart = nv.models.lineChart()
			.options({
				margin: {left: 50, bottom: 50,right: 50, top: 50},
				x: function(d,i) { return i},
				showXAxis: true,
				showYAxis: true,
				transitionDuration: 250,
				useInteractiveGuideline:true
			}).showLegend(false)
		;

		// chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
		if(data[0].key=="day"  || data[0].key=="week" ){
			chart.xAxis.tickFormat(function(d) {
				var dx = data[0].values[d] && data[0].values[d].x || 0;
				return dx ? d3.time.format('%d/%m %H:%M')(new Date(dx)) : '';
			})
				.showMaxMin(false);
		}else if(data[0].key=="Max"){
			chart.xAxis.tickFormat(function(d) {
				var dx = data[0].values[d] && data[0].values[d].x || 0;
				return dx ? d3.time.format('%b %Y')(new Date(dx)) : '';
			})
				.showMaxMin(false);
		}
		else if(data[0].key=="month" || data[0].key=="year" || data[0].key=="sixmonths"){
			chart.xAxis.tickFormat(function(d) {
				var dx = data[0].values[d] && data[0].values[d].x || 0;
				return dx ? d3.time.format('%d/%m/%Y')(new Date(dx)) : '';
			})
				.showMaxMin(false);
		}

		chart.yAxis
			.tickFormat(d3.format(',.d'))
		;

		d3.select('#'+chartId+' svg')
			.datum(data)
			.call(chart);
		
		/*d3.select('#'+chartId+' svg g')
			.attr('transform',"translate(50,30)");*/

		//TODO: Figure out a good way to do this automatically
		nv.utils.windowResize(chart.update);
		//nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

		chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

		return chart;
	});
}


function drawBarChart(data,chartId){
	var chart;
	nv.addGraph(function() {
		chart = nv.models.multiBarChart()
			.showControls(false)
			.staggerLabels(true)
			.showLegend(false);

		//chart.xAxis.tickFormat(function(d) {
		//  return d3.time.format('%m/%d/%y')(new Date(d));
		//});
		if(data[0].key=="day"|| data[0].key=="1D" || data[0].key=="week"){
			chart.xAxis.tickFormat(function(d) {
				return d3.time.format('%d/%m %H:%M')(new Date(d));
			});
		}else if(data[0].key=="Max"){
			chart.xAxis.tickFormat(function(d) {
				return d3.time.format('%b %Y')(new Date(d));
			});
		}
		else if(data[0].key=="month" || data[0].key=="year" || data[0].key=="sixmonths"){
			chart.xAxis.tickFormat(function(d) {
				return d3.time.format('%d/%m/%Y')(new Date(d));
			});
		}

		chart.yAxis
			.axisLabel('Count')
			.tickFormat(d3.format(',.d'));
		
		if(chartId=="personasPerUser"){
			chart.xAxis
				.axisLabel('Personas')
				.tickFormat(d3.format(',.d'))
			;
		}else if(chartId=="cardsSentPerUser"){
			chart.xAxis
				.axisLabel('cards')
				.tickFormat(d3.format(',.d'))
			;
		}
		else if(chartId=="contactsPerUser"){
			chart.xAxis
				.axisLabel('Contacts')
				.tickFormat(d3.format(',.d'))
			;
		}

		if(chartId=="personasPerUser" ||chartId=="cardsSentPerUser" || chartId=="contactsPerUser"){
			chart.yAxis
				.axisLabel('Users')
				.tickFormat(d3.format(',.d')) ;
		}
		

		d3.select('#'+chartId+' svg')
			.datum(data)
			.call(chart);

		nv.utils.windowResize(chart.update);

		chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

		return chart;
	});
}
function drawFunnelChart(data,chartId){
	if($('#'+chartId+' svg').length>0){
		$('#'+chartId+' svg').remove();
	}
	var chart = new FunnelChart(data, 450, 350, 1/6);
	chart.draw('#'+chartId, 2);
}
function groupedBarChart(data,chartId){
	var chart = nv.models.multiBarChart()
			.transitionDuration(350)
			.reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
			.rotateLabels(0)      //Angle to rotate x-axis labels.
			.showControls(false)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
			.groupSpacing(0.1)    //Distance between each group of bars.

		;
	chart.x(function(d) {
		return d.x;
	});
	chart.y(function(d) {
		return d.y;
	});

	chart.multibar.stacked(true);
	chart.xAxis
		.axisLabel('Users')
		.tickFormat(d3.format(',f'));

	chart.yAxis
		.tickFormat(d3.format(',.1f'));
	//chart.style('stack');

	d3.select('#'+chartId+' svg')
		.datum(data)
		.call(chart);

	//if( d3.select('#'+chartId+' svg g.nv-axis text')[0][0]!=null)
	//  d3.select('#'+chartId+' svg g.nv-axis text')[0][0].textContent="Users"

	nv.utils.windowResize(chart.update);

	return chart;
}
function drawPieChart(data,chartId){
	if($('#'+chartId+' g').length>0){
		$('#'+chartId+' g').remove();
	}
	nv.addGraph(function() {
		var width = 500,
			height = 380;

		var chart = nv.models.pieChart()
			.x(function(d) { return d.key })
			.y(function(d) { return d.y })
			.width(width)
			.height(height);

		if(chartId=="browserChart" || chartId=="deviceChart"){
			chart.color(function(d) {
				return d.data.color })
		}else{
			chart.color(d3.scale.category10().range())
		}
		d3.select("#"+chartId)
			.datum(data)
			.transition().duration(350)
			.attr('width', width)
			.attr('height', height)
			.call(chart);
		// Assuming your chart is called 'chart'

		// / Array of series you want to hide
		nv.utils.windowResize(function() { d3.select('#'+chartId+' svg').call(chart); });



		$('#deviceChart .nv-pie .nv-pie .nv-slice').click(function(e){
			e.preventDefault();
			var ind=0;
			for(var i=0;i<$('#deviceChart .nv-pie .nv-pie')[0].__data__.length;i++){
				if($('#deviceChart .nv-pie .nv-pie')[0].__data__[i].key==e.target.__data__.data.key){
					ind=i;
				}
			}
			var state = chart.state();
			state.disabled;
			for(var i=0; i < state.disabled.length; i++) {
				state.disabled[i] = true;
			}
			state.disabled[ind]=false;
			chart.dispatch.changeState(state);
			chart.update();
			var pieChartText =e.target.__data__.data.key;
			if(chartId=='deviceChart' && $scope.currentCountry!=""){
				var url=$scope.mainurl+'search?q=browser&device='+pieChartText+'&country='+$scope.currentCountry;
				$http({
					method : "GET",
					url : url,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(data, status, headers, config) {
					drawPieChart(data,'browserChart');
					return false;
				});
			}
			else if(chartId=='deviceChart' && $scope.currentCountry=="" ){
				var url=$scope.mainurl+'search?q=browser&device='+pieChartText;
				$http({
					method : "GET",
					url : url,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(data, status, headers, config) {
					drawPieChart(data,'browserChart');
					return false;
				});
			}
			//alert(temp);
		});
		$('#deviceChart .nv-legendWrap .nv-series').click(function(e){
			console.log('click');
			var deviceList=[],devices=[];
			deviceList=$('#deviceChart .nv-legendWrap .nv-series.disabled text');
			if(deviceList.length>0){

				for(var i=0;i<deviceList.length;i++){
					console.log('res',deviceList[i].textContent);
					devices.push(deviceList[i].textContent);
				}


			}
			console.log('devices',devices);
			var url=$scope.mainurl+'search?q=browser&deviceDisabled='+devices;
			$http({
				method : "GET",
				url : url,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data, status, headers, config) {
				drawPieChart(data,'browserChart');
				return false;
			});
			return false;
		});
		$('#browserChart .nv-legendWrap .nv-series').click(function(e){
			console.log('click');
			var deviceList=[],devices=[];
			deviceList=$('#browserChart .nv-legendWrap .nv-series.disabled text');
			if(deviceList.length>0){

				for(var i=0;i<deviceList.length;i++){
					console.log('res',deviceList[i].textContent);
					devices.push(deviceList[i].textContent);
				}


			}
			console.log('devices',devices);
			var url=$scope.mainurl+'search?q=device&deviceDisabled='+devices;
			$http({
				method : "GET",
				url : url,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data, status, headers, config) {
				drawPieChart(data,'deviceChart');
				return false;
			});
			return false;
		});
		$('#browserChart .nv-pie .nv-pie .nv-slice').click(function(e){
			e.preventDefault();
			e.preventDefault();
			var ind=0;
			for(var i=0;i<$('#browserChart .nv-pie .nv-pie')[0].__data__.length;i++){
				if($('#browserChart .nv-pie .nv-pie')[0].__data__[i].key==e.target.__data__.data.key){
					ind=i;
				}
			}
			var state = chart.state();
			state.disabled;
			for(var i=0; i < state.disabled.length; i++) {
				state.disabled[i] = true;
			}
			state.disabled[ind]=false;
			chart.dispatch.changeState(state);
			chart.update();
			var pieChartText =e.target.__data__.data.key;
			if(chartId=='browserChart' && $scope.currentCountry==""){
				var url=$scope.mainurl+'search?q=device&browser='+pieChartText;
				$http({
					method : "GET",
					url : url,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(data, status, headers, config) {
					drawPieChart(data,'deviceChart');

					return false;
				});
			}else if(chartId=='browserChart' && $scope.currentCountry!=""){
				var url=$scope.mainurl+'search?q=device&browser='+pieChartText+'&country='+$scope.currentCountry;
				$http({
					method : "GET",
					url : url,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(data, status, headers, config) {
					drawPieChart(data,'deviceChart');

					return false;
				});
			}
			return false;

		});
		chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

		return chart;
	});

}
function drawhorizontalBarChart(data,chartId){
	var chart;
	nv.addGraph(function() {
		chart = nv.models.multiBarHorizontalChart()
			.x(function(d) { return d.label })
			.y(function(d) { return d.value })
			.margin({top: 30, right: 20, bottom: 50, left: 175})
			.showValues(true)           //Show bar value next to each bar.
			.tooltips(true)             //Show tooltips on hover.
			.transitionDuration(350)
			.showControls(false)       //Allow user to switch between "Grouped" and "Stacked" mode.
			.showLegend(false);
		//chart.valueFormat(d3.format(',.0d'));
		//chart.valueFormat(d3.format('.0%'));

		chart.yAxis
			.tickFormat(d3.format('d'));

		d3.select('#'+chartId+' svg')
			.datum(data)
			.call(chart);
		d3.select('#'+chartId+' svg g').attr('transform','translate(70,30)');
		//$('#commonlysharedpersona .nv-group g rect').attr('height',$('#commonlysharedpersona .nv-group g rect').attr('height')-10)

		nv.utils.windowResize(chart.update);
		d3.select('#'+chartId+' .nv-group g rect').attr('height',82)
		return chart;
	});
}
var countryByCode={
	'AF' : 'Afghanistan',
	'AX' : 'Aland Islands',
	'AL' : 'Albania',
	'DZ' : 'Algeria',
	'AS' : 'American Samoa',
	'AD' : 'Andorra',
	'AO' : 'Angola',
	'AI' : 'Anguilla',
	'AQ' : 'Antarctica',
	'AG' : 'Antigua And Barbuda',
	'AR' : 'Argentina',
	'AM' : 'Armenia',
	'AW' : 'Aruba',
	'AU' : 'Australia',
	'AT' : 'Austria',
	'AZ' : 'Azerbaijan',
	'BS' : 'Bahamas',
	'BH' : 'Bahrain',
	'BD' : 'Bangladesh',
	'BB' : 'Barbados',
	'BY' : 'Belarus',
	'BE' : 'Belgium',
	'BZ' : 'Belize',
	'BJ' : 'Benin',
	'BM' : 'Bermuda',
	'BT' : 'Bhutan',
	'BO' : 'Bolivia',
	'BA' : 'Bosnia And Herzegovina',
	'BW' : 'Botswana',
	'BV' : 'Bouvet Island',
	'BR' : 'Brazil',
	'IO' : 'British Indian Ocean Territory',
	'BN' : 'Brunei Darussalam',
	'BG' : 'Bulgaria',
	'BF' : 'Burkina Faso',
	'BI' : 'Burundi',
	'KH' : 'Cambodia',
	'CM' : 'Cameroon',
	'CA' : 'Canada',
	'CV' : 'Cape Verde',
	'KY' : 'Cayman Islands',
	'CF' : 'Central African Republic',
	'TD' : 'Chad',
	'CL' : 'Chile',
	'CN' : 'China',
	'CX' : 'Christmas Island',
	'CC' : 'Cocos (Keeling) Islands',
	'CO' : 'Colombia',
	'KM' : 'Comoros',
	'CG' : 'Congo',
	'CD' : 'Congo, Democratic Republic',
	'CK' : 'Cook Islands',
	'CR' : 'Costa Rica',
	'CI' : 'Cote D\'Ivoire',
	'HR' : 'Croatia',
	'CU' : 'Cuba',
	'CY' : 'Cyprus',
	'CZ' : 'Czech Republic',
	'DK' : 'Denmark',
	'DJ' : 'Djibouti',
	'DM' : 'Dominica',
	'DO' : 'Dominican Republic',
	'EC' : 'Ecuador',
	'EG' : 'Egypt',
	'SV' : 'El Salvador',
	'GQ' : 'Equatorial Guinea',
	'ER' : 'Eritrea',
	'EE' : 'Estonia',
	'ET' : 'Ethiopia',
	'FK' : 'Falkland Islands (Malvinas)',
	'FO' : 'Faroe Islands',
	'FJ' : 'Fiji',
	'FI' : 'Finland',
	'FR' : 'France',
	'GF' : 'French Guiana',
	'PF' : 'French Polynesia',
	'TF' : 'French Southern Territories',
	'GA' : 'Gabon',
	'GM' : 'Gambia',
	'GE' : 'Georgia',
	'DE' : 'Germany',
	'GH' : 'Ghana',
	'GI' : 'Gibraltar',
	'GR' : 'Greece',
	'GL' : 'Greenland',
	'GD' : 'Grenada',
	'GP' : 'Guadeloupe',
	'GU' : 'Guam',
	'GT' : 'Guatemala',
	'GG' : 'Guernsey',
	'GN' : 'Guinea',
	'GW' : 'Guinea-Bissau',
	'GY' : 'Guyana',
	'HT' : 'Haiti',
	'HM' : 'Heard Island & Mcdonald Islands',
	'VA' : 'Holy See (Vatican City State)',
	'HN' : 'Honduras',
	'HK' : 'Hong Kong',
	'HU' : 'Hungary',
	'IS' : 'Iceland',
	'IN' : 'India',
	'ID' : 'Indonesia',
	'IR' : 'Iran, Islamic Republic Of',
	'IQ' : 'Iraq',
	'IE' : 'Ireland',
	'IM' : 'Isle Of Man',
	'IL' : 'Israel',
	'IT' : 'Italy',
	'JM' : 'Jamaica',
	'JP' : 'Japan',
	'JE' : 'Jersey',
	'JO' : 'Jordan',
	'KZ' : 'Kazakhstan',
	'KE' : 'Kenya',
	'KI' : 'Kiribati',
	'KR' : 'Korea',
	'KW' : 'Kuwait',
	'KG' : 'Kyrgyzstan',
	'LA' : 'Lao People\'s Democratic Republic',
	'LV' : 'Latvia',
	'LB' : 'Lebanon',
	'LS' : 'Lesotho',
	'LR' : 'Liberia',
	'LY' : 'Libyan Arab Jamahiriya',
	'LI' : 'Liechtenstein',
	'LT' : 'Lithuania',
	'LU' : 'Luxembourg',
	'MO' : 'Macao',
	'MK' : 'Macedonia',
	'MG' : 'Madagascar',
	'MW' : 'Malawi',
	'MY' : 'Malaysia',
	'MV' : 'Maldives',
	'ML' : 'Mali',
	'MT' : 'Malta',
	'MH' : 'Marshall Islands',
	'MQ' : 'Martinique',
	'MR' : 'Mauritania',
	'MU' : 'Mauritius',
	'YT' : 'Mayotte',
	'MX' : 'Mexico',
	'FM' : 'Micronesia, Federated States Of',
	'MD' : 'Moldova',
	'MC' : 'Monaco',
	'MN' : 'Mongolia',
	'ME' : 'Montenegro',
	'MS' : 'Montserrat',
	'MA' : 'Morocco',
	'MZ' : 'Mozambique',
	'MM' : 'Myanmar',
	'NA' : 'Namibia',
	'NR' : 'Nauru',
	'NP' : 'Nepal',
	'NL' : 'Netherlands',
	'AN' : 'Netherlands Antilles',
	'NC' : 'New Caledonia',
	'NZ' : 'New Zealand',
	'NI' : 'Nicaragua',
	'NE' : 'Niger',
	'NG' : 'Nigeria',
	'NU' : 'Niue',
	'NF' : 'Norfolk Island',
	'MP' : 'Northern Mariana Islands',
	'NO' : 'Norway',
	'OM' : 'Oman',
	'PK' : 'Pakistan',
	'PW' : 'Palau',
	'PS' : 'Palestinian Territory, Occupied',
	'PA' : 'Panama',
	'PG' : 'Papua New Guinea',
	'PY' : 'Paraguay',
	'PE' : 'Peru',
	'PH' : 'Philippines',
	'PN' : 'Pitcairn',
	'PL' : 'Poland',
	'PT' : 'Portugal',
	'PR' : 'Puerto Rico',
	'QA' : 'Qatar',
	'RE' : 'Reunion',
	'RO' : 'Romania',
	'RU' : 'Russian Federation',
	'RW' : 'Rwanda',
	'BL' : 'Saint Barthelemy',
	'SH' : 'Saint Helena',
	'KN' : 'Saint Kitts And Nevis',
	'LC' : 'Saint Lucia',
	'MF' : 'Saint Martin',
	'PM' : 'Saint Pierre And Miquelon',
	'VC' : 'Saint Vincent And Grenadines',
	'WS' : 'Samoa',
	'SM' : 'San Marino',
	'ST' : 'Sao Tome And Principe',
	'SA' : 'Saudi Arabia',
	'SN' : 'Senegal',
	'RS' : 'Serbia',
	'SC' : 'Seychelles',
	'SL' : 'Sierra Leone',
	'SG' : 'Singapore',
	'SK' : 'Slovakia',
	'SI' : 'Slovenia',
	'SB' : 'Solomon Islands',
	'SO' : 'Somalia',
	'ZA' : 'South Africa',
	'GS' : 'South Georgia And Sandwich Isl.',
	'ES' : 'Spain',
	'LK' : 'Sri Lanka',
	'SD' : 'Sudan',
	'SR' : 'Suriname',
	'SJ' : 'Svalbard And Jan Mayen',
	'SZ' : 'Swaziland',
	'SE' : 'Sweden',
	'CH' : 'Switzerland',
	'SY' : 'Syrian Arab Republic',
	'TW' : 'Taiwan',
	'TJ' : 'Tajikistan',
	'TZ' : 'Tanzania',
	'TH' : 'Thailand',
	'TL' : 'Timor-Leste',
	'TG' : 'Togo',
	'TK' : 'Tokelau',
	'TO' : 'Tonga',
	'TT' : 'Trinidad And Tobago',
	'TN' : 'Tunisia',
	'TR' : 'Turkey',
	'TM' : 'Turkmenistan',
	'TC' : 'Turks And Caicos Islands',
	'TV' : 'Tuvalu',
	'UG' : 'Uganda',
	'UA' : 'Ukraine',
	'AE' : 'United Arab Emirates',
	'GB' : 'United Kingdom',
	'US' : 'United States',
	'UM' : 'United States Outlying Islands',
	'UY' : 'Uruguay',
	'UZ' : 'Uzbekistan',
	'VU' : 'Vanuatu',
	'VE' : 'Venezuela',
	'VN' : 'Viet Nam',
	'VG' : 'Virgin Islands, British',
	'VI' : 'Virgin Islands, U.S.',
	'WF' : 'Wallis And Futuna',
	'EH' : 'Western Sahara',
	'YE' : 'Yemen',
	'ZM' : 'Zambia',
	'ZW' : 'Zimbabwe'
};

var codeByCountry={
	"Afghanistan": "AF",
	"Aland Islands": "AX",
	"Albania": "AL",
	"Algeria": "DZ",
	"American Samoa": "AS",
	"Andorra": "AD",
	"Angola": "AO",
	"Anguilla": "AI",
	"Antarctica": "AQ",
	"Antigua And Barbuda": "AG",
	"Argentina": "AR",
	"Armenia": "AM",
	"Aruba": "AW",
	"Australia": "AU"
	/*"Austria: "AT"
	"Azerbaijan: "AZ"
	"Bahamas: "BS"
	"Bahrain: "BH"
	"Bangladesh: "BD"
	"Barbados: "BB"
	"Belarus: "BY"
	"Belgium: "BE"
	Belize: "BZ"
	Benin: "BJ"
	Bermuda: "BM"
	Bhutan: "BT"
	Bolivia: "BO"
	Bosnia And Herzegovina: "BA"
	Botswana: "BW"
	Bouvet Island: "BV"
	Brazil: "BR"
	British Indian Ocean Territory: "IO"
	Brunei Darussalam: "BN"
	Bulgaria: "BG"
	Burkina Faso: "BF"
	Burundi: "BI"
	Cambodia: "KH"
	Cameroon: "CM"
	Canada: "CA"
	Cape Verde: "CV"
	Cayman Islands: "KY"
	Central African Republic: "CF"
	Chad: "TD"
	Chile: "CL"
	China: "CN"
	Christmas Island: "CX"
	Cocos (Keeling) Islands: "CC"
	Colombia: "CO"
	Comoros: "KM"
	Congo: "CG"
	Congo, Democratic Republic: "CD"
	Cook Islands: "CK"
	Costa Rica: "CR"
	Cote D'Ivoire: "CI"
	Croatia: "HR"
	Cuba: "CU"
	Cyprus: "CY"
	Czech Republic: "CZ"
	Denmark: "DK"
	Djibouti: "DJ"
	Dominica: "DM"
	Dominican Republic: "DO"
	Ecuador: "EC"
	Egypt: "EG"
	El Salvador: "SV"
	Equatorial Guinea: "GQ"
	Eritrea: "ER"
	Estonia: "EE"
	Ethiopia: "ET"
	Falkland Islands (Malvinas): "FK"
	Faroe Islands: "FO"
	Fiji: "FJ"
	Finland: "FI"
	France: "FR"
	French Guiana: "GF"
	French Polynesia: "PF"
	French Southern Territories: "TF"
	Gabon: "GA"
	Gambia: "GM"
	Georgia: "GE"
	Germany: "DE"
	Ghana: "GH"
	Gibraltar: "GI"
	Greece: "GR"
	Greenland: "GL"
	Grenada: "GD"
	Guadeloupe: "GP"
	Guam: "GU"
	Guatemala: "GT"
	Guernsey: "GG"
	Guinea: "GN"
	Guinea-Bissau: "GW"
	Guyana: "GY"
	Haiti: "HT"
	Heard Island & Mcdonald Islands: "HM"
	Holy See (Vatican City State): "VA"
	Honduras: "HN"
	Hong Kong: "HK"
	Hungary: "HU"
	Iceland: "IS"
	India: "IN"
	Indonesia: "ID"
	Iran, Islamic Republic Of: "IR"
	Iraq: "IQ"
	Ireland: "IE"
	Isle Of Man: "IM"
	Israel: "IL"
	Italy: "IT"
	Jamaica: "JM"
	Japan: "JP"
	Jersey: "JE"
	Jordan: "JO"
	Kazakhstan: "KZ"
	Kenya: "KE"
	Kiribati: "KI"
	Korea: "KR"
	Kuwait: "KW"
	Kyrgyzstan: "KG"
	Lao People's Democratic Republic: "LA"
	Latvia: "LV"
	Lebanon: "LB"
	Lesotho: "LS"
	Liberia: "LR"
	Libyan Arab Jamahiriya: "LY"
	Liechtenstein: "LI"
	Lithuania: "LT"
	Luxembourg: "LU"
	Macao: "MO"
	Macedonia: "MK"
	Madagascar: "MG"
	Malawi: "MW"
	Malaysia: "MY"
	Maldives: "MV"
	Mali: "ML"
	Malta: "MT"
	Marshall Islands: "MH"
	Martinique: "MQ"
	Mauritania: "MR"
	Mauritius: "MU"
	Mayotte: "YT"
	Mexico: "MX"
	Micronesia, Federated States Of: "FM"
	Moldova: "MD"
	Monaco: "MC"
	Mongolia: "MN"
	Montenegro: "ME"
	Montserrat: "MS"
	Morocco: "MA"
	Mozambique: "MZ"
	Myanmar: "MM"
	Namibia: "NA"
	Nauru: "NR"
	Nepal: "NP"
	Netherlands: "NL"
	Netherlands Antilles: "AN"
	New Caledonia: "NC"
	New Zealand: "NZ"
	Nicaragua: "NI"
	Niger: "NE"
	Nigeria: "NG"
	Niue: "NU"
	Norfolk Island: "NF"
	Northern Mariana Islands: "MP"
	Norway: "NO"
	Oman: "OM"
	Pakistan: "PK"
	Palau: "PW"
	Palestinian Territory, Occupied: "PS"
	Panama: "PA"
	Papua New Guinea: "PG"
	Paraguay: "PY"
	Peru: "PE"
	Philippines: "PH"
	Pitcairn: "PN"
	Poland: "PL"
	Portugal: "PT"
	Puerto Rico: "PR"
	Qatar: "QA"
	Reunion: "RE"
	Romania: "RO"
	Russian Federation: "RU"
	Rwanda: "RW"
	Saint Barthelemy: "BL"
	Saint Helena: "SH"
	Saint Kitts And Nevis: "KN"
	Saint Lucia: "LC"
	Saint Martin: "MF"
	Saint Pierre And Miquelon: "PM"
	Saint Vincent And Grenadines: "VC"
	Samoa: "WS"
	San Marino: "SM"
	Sao Tome And Principe: "ST"
	Saudi Arabia: "SA"
	Senegal: "SN"
	Serbia: "RS"
	Seychelles: "SC"
	Sierra Leone: "SL"
	Singapore: "SG"
	Slovakia: "SK"
	Slovenia: "SI"
	Solomon Islands: "SB"
	Somalia: "SO"
	South Africa: "ZA"
	South Georgia And Sandwich Isl.: "GS"
	Spain: "ES"
	Sri Lanka: "LK"
	Sudan: "SD"
	Suriname: "SR"
	Svalbard And Jan Mayen: "SJ"
	Swaziland: "SZ"
	Sweden: "SE"
	Switzerland: "CH"
	Syrian Arab Republic: "SY"
	Taiwan: "TW"
	Tajikistan: "TJ"
	Tanzania: "TZ"
	Thailand: "TH"
	Timor-Leste: "TL"
	Togo: "TG"
	Tokelau: "TK"
	Tonga: "TO"
	Trinidad And Tobago: "TT"
	Tunisia: "TN"
	Turkey: "TR"
	Turkmenistan: "TM"
	Turks And Caicos Islands: "TC"
	Tuvalu: "TV"
	Uganda: "UG"
	Ukraine: "UA"
	United Arab Emirates: "AE"
	United Kingdom: "GB"
	United States: "US"
	United States Outlying Islands: "UM"
	"Uruguay: "UY"
	"Uzbekistan: "UZ"
	"Vanuatu: "VU"
	"Venezuela: "VE"
	"Viet Nam: "VN"
	"Virgin Islands, British: "VG"
	"Virgin Islands, U.S.: "VI"
	"Wallis And Futuna: "WF"
	"Western Sahara: "EH"
	"Yemen: "YE"
	"Zambia": "ZM"
	"Zimbabwe": "ZW"*/
};

