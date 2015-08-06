flickmiApp.controller('signoutController', function($http, $scope, $rootScope,mainInfoFactory) {
	$scope.server=mainInfoFactory.getServerName();
	$scope.port=mainInfoFactory.getPort();
	$scope.protocol=mainInfoFactory.getProtocol();
	$scope.mainurl=$scope.protocol+'://'+$scope.server+'/'
	$scope.currentCountry="";
	$scope.currentdevice="";
	$scope.currentbrowser="";
  var url=$scope.mainurl+'search?q=totalLogouts&dateRange=day';// by default show one day data
      $http({
           method : "GET",
           url : url,
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data, status, headers, config) {
          drawLineChart(data.results,'signout');
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
	$scope.getLineChartData=function(daterange,searchquery,chartId){
          console.log(daterange);
          if(daterange!=null && $scope.currentCountry=="" && $scope.currentdevice=="" && $scope.currentbrowser==""){
           var url=$scope.mainurl+'search?q='+searchquery+'&dateRange='+daterange;
           $http({
                       method : "GET",
                       url : url,
                       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
           }).success(function(data, status, headers, config) {
               drawLineChart(data.results,chartId);
               //console.log('data',data);
           });
       }else if(daterange!=null&&$scope.currentCountry!="" && $scope.currentdevice=="" && $scope.currentbrowser==""){
			var url=$scope.mainurl+'search?q='+searchquery+'&dateRange='+daterange+'&country='+$scope.currentCountry;
            $http({
                        method : "GET",
                        url : url,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data, status, headers, config) {
                drawLineChart(data.results,chartId);
                //console.log('data',data);
            });
		}else if(daterange!=null&&$scope.currentCountry!="" && $scope.currentdevice!="" && $scope.currentbrowser==""){
			var url=$scope.mainurl+'search?q='+searchquery+'&dateRange='+daterange+'&country='+$scope.currentCountry+'&device='+$scope.currentdevice;
            $http({
                        method : "GET",
                        url : url,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data, status, headers, config) {
                drawLineChart(data.results,chartId);
                //console.log('data',data);
            });
		}else if(daterange!=null&&$scope.currentCountry!="" && $scope.currentdevice!="" && $scope.currentbrowser!=""){
			var url=$scope.mainurl+'search?q='+searchquery+'&dateRange='+daterange+'&country='+$scope.currentCountry+'&device='+$scope.currentdevice+'&browser='+$scope.currentbrowser;
            $http({
                        method : "GET",
                        url : url,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data, status, headers, config) {
                drawLineChart(data.results,chartId);
                //console.log('data',data);
            });
		}else if(daterange!=null&&$scope.currentCountry=="" && $scope.currentdevice!="" && $scope.currentbrowser!=""){
			var url=$scope.mainurl+'search?q='+searchquery+'&dateRange='+daterange+'&device='+$scope.currentdevice+'&browser='+$scope.currentbrowser;
            $http({
                        method : "GET",
                        url : url,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data, status, headers, config) {
                drawLineChart(data.results,chartId);
                //console.log('data',data);
            });
		}else if(daterange!=null&&$scope.currentCountry=="" && $scope.currentdevice!="" && $scope.currentbrowser==""){
			var url=$scope.mainurl+'search?q='+searchquery+'&dateRange='+daterange+'&device='+$scope.currentdevice;
            $http({
                        method : "GET",
                        url : url,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data, status, headers, config) {
                drawLineChart(data.results,chartId);
                //console.log('data',data);
            });
		}else if(daterange!=null&&$scope.currentCountry=="" && $scope.currentdevice=="" && $scope.currentbrowser!=""){
			var url=$scope.mainurl+'search?q='+searchquery+'&dateRange='+daterange+'&browser='+$scope.currentbrowser;
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
	var mapWidth = 660,
    mapHeight = 500,
    focused = false,
    //ortho = true,
    sens = 0.25;

    var projectionGlobe = d3.geo.orthographic()
    .scale(240)
    .rotate([0, 0])
    .translate([mapWidth / 2, mapHeight / 2])
    .clipAngle(90);

    var projectionMap = d3.geo.equirectangular()
    .scale(90)
    .translate([mapWidth / 2, mapHeight / 2])

    var projection = projectionGlobe;

    var path = d3.geo.path()
    .projection(projection);

    var svgMap = d3.select("div#map").append("svg")
    .attr("overflow", "hidden")
    .attr("width", mapWidth)
    .attr("height", mapHeight);

    var zoneTooltip = d3.select("div#map").append("div").attr("class", "zoneTooltip"),
    infoLabel = d3.select("div#map").append("div").attr("class", "infoLabel");

    var g = svgMap.append("g");
     defaultRotate();
             // setTimeout(function() {
                g.selectAll(".ortho").classed("ortho", ortho = false);
                projection = projectionMap;
                path.projection(projection);
                g.selectAll("path").transition().duration(5000).attr("d", path);
             // }
              //, 1600);
    //Rotate to default before animation

    function defaultRotate() {
      d3.transition()
      .duration(1500)
      .tween("rotate", function() {
        var r = d3.interpolate(projection.rotate(), [0, 0]);
        return function(t) {
          projection.rotate(r(t));
          g.selectAll("path").attr("d", path);
        };
      })
    };

    //Loading data

    queue()
    .defer(d3.json, "/data/world-110m.json")
    .defer(d3.tsv, "/data/world-110m-country-names.tsv")
    .await(ready);


    function ready(error, world, countryData) {

      var countryById = {},
      countries = topojson.feature(world, world.objects.countries).features;

      //Adding countries by name

      countryData.forEach(function(d) {
        countryById[d.id] = d.name;
      });

      //Drawing countries on the globe

      var world = g.selectAll("path").data(countries);
      world.enter().append("path")
      .attr("class", "mapData")
      .attr("d", path)
      //.classed("ortho", ortho = true);

      //Drag event

      world.call(d3.behavior.drag()
        .origin(function() { var r = projection.rotate(); return {x: r[0] / sens, y: -r[1] / sens}; })
        .on("drag", function() {
          var i = d3.event.x * sens,
          it = -d3.event.y * sens,
          rotate = projection.rotate();
          //Restriction for rotating upside-down
          it = it > 30 ? 30 :
          it < -30 ? -30 :
          it;
          projection.rotate([i, it]);
          g.selectAll("path").attr("d", path);
          g.selectAll(".focused").classed("focused", focused = false);
        }))

      //Events processing

      world.on("mouseover", function(d) {
       // if (ortho === true) {
          infoLabel.text(countryById[d.id])
          .style("display", "inline");
            zoneTooltip.text(countryById[d.id])
            .style("left", (d3.event.pageX +7) + "px")
            .style("top", (d3.event.pageY - 15) + "px")
            .style("display", "block");
        /*} else {

        } */
      })
      .on("mouseout", function(d) {
        //if (ortho === true) {
          infoLabel.style("display", "none");
       // } else {
        //  zoneTooltip.style("display", "none");
       // }
      })
      .on("mousemove", function() {
       // if (ortho === false) {
          zoneTooltip.style("left", (d3.event.pageX -300) + "px")
          .style("top", (d3.event.pageY - 100) + "px");
        //}
      })
      .on("click", function(d) {
        //if (focused === d) return reset();
        g.selectAll(".focused").classed("focused", false);
        d3.select(this).classed("focused", focused = d);
        infoLabel.text(countryById[d.id])
        .style("display", "inline");

        //Transforming Globe to Map

        if (ortho === true) {
          defaultRotate();
          setTimeout(function() {
            g.selectAll(".ortho").classed("ortho", ortho = false);
            projection = projectionMap;
            path.projection(projection);
            g.selectAll("path").transition().duration(5000).attr("d", path);
          }
          , 1600);
        }
        chartsUpdate(countryById[d.id]);
        $scope.currentCountry=countryById[d.id];
      });

      //Adding extra data when focused

      function focus(d) {
        //if (focused === d) return reset();
        g.selectAll(".focused").classed("focused", false);
        d3.select(this).classed("focused", focused = d);
      }

      /*function reset() {
        g.selectAll(".focused").classed("focused", focused = false);
        infoLabel.style("display", "none");
        zoneTooltip.style("display", "none");

        //Transforming Map to Globe

        projection = projectionGlobe;
        path.projection(projection);
        g.selectAll("path").transition().duration(5000).attr("d", path)
        g.selectAll("path").classed("ortho", ortho = true);
      } */
    };
  
      function drawLineChart(data,chartId){
          if(data[0].values.length==0){
               $('#'+chartId+' g').remove();
          }
          var chart;

          nv.addGraph(function() {
            chart = nv.models.lineChart()
            .options({
              margin: {left: 100, bottom: 100},
              x: function(d,i) { return i},
              showXAxis: true,
              showYAxis: true,
              transitionDuration: 250
            })
            ;

            // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
           // chart.xAxis
              //.axisLabel("Time (s)")
              //.tickFormat(d3.format(',.1f'));
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
                   .axisLabel('Count')
                   .tickFormat(d3.format(',d'))

            d3.select('#'+chartId+' svg')
              .datum(data)
              .call(chart);

            //TODO: Figure out a good way to do this automatically
            nv.utils.windowResize(chart.update);
            //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

            chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

            return chart;
          });
      }
  function drawPieChart(data,chartId){
    if($('#'+chartId+' g').length>0){
        $('#'+chartId+' g').remove();
    }
    nv.addGraph(function() {
        var width = 300,
            height = 300;

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
            .transition().duration(1200)
              .attr('width', width)
              .attr('height', height)
              .call(chart);
           //d3.select("#"+chartId+" g").attr('transform','translate(100,30)')
        /*d3.selectAll('.nv-slice')
              .on('click', function(){
                console.log('hello - ', this.getElementsByClassName("nv-label")[0].textContent);
              });*/
        $('.nv-pie .nv-pie .nv-slice').click(function(e){
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
		   var id=e.target.farthestViewportElement.id
           if(id=='deviceChart' && $scope.currentCountry!=""){
				$scope.currentdevice=pieChartText;
				var url=$scope.mainurl+'search?q=totalLogouts&dateRange=day&country='+$scope.currentCountry+'&device='+pieChartText;
                $http({
                        method : "GET",
						url : url,
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data, status, headers, config) {
                      drawLineChart(data.results,'signout');
                });
                var url=$scope.mainurl+'search?q=browser&device='+pieChartText+'&country='+$scope.currentCountry;
                $http({
                        method : "GET",
						url : url,
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data, status, headers, config) {
                    drawPieChart(data,'browserChart');
                });
           } else if($scope.currentCountry=="" && id=='deviceChart'){
				var url=$scope.mainurl+'search?q=totalLogouts&dateRange=day&device='+pieChartText;
                $http({
                        method : "GET",
						url : url,
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data, status, headers, config) {
                      drawLineChart(data.results,'signout');
                });
                var url=$scope.mainurl+'search?q=browser&device='+pieChartText;
                $http({
						method : "GET",
						url : url,
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data, status, headers, config) {
                    drawPieChart(data,'browserChart');
                });
           }else if($scope.currentCountry=="" && id=='browserChart' && $scope.currentdevice!=""){
				var url=$scope.mainurl+'search?q=totalLogouts&dateRange=day&device='+$scope.currentdevice+'&browser='+pieChartText;
                $http({
                        method : "GET",
						url : url,
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data, status, headers, config) {
                      drawLineChart(data.results,'signout');
                });
                
           }else if($scope.currentCountry!="" && id=='browserChart' && $scope.currentdevice!=""){
				var url=$scope.mainurl+'search?q=totalLogouts&dateRange=day&&country='+$scope.currentCountry+'&device='+$scope.currentdevice+'&browser='+pieChartText;
                $http({
                        method : "GET",
						url : url,
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data, status, headers, config) {
                      drawLineChart(data.results,'signout');
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
   function chartsUpdate(Country){
        console.log('Country',Country);
        var url=$scope.mainurl+'search?q=device&country='+Country;
        $http({
				method : "GET",
				url : url,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(data, status, headers, config) {
              drawPieChart(data,'deviceChart');
              //drawPieChart(data,'browserChart');
        });
        var url=$scope.mainurl+'search?q=browser&country='+Country;
        $http({
				method : "GET",
				url : url,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(data, status, headers, config) {
              drawPieChart(data,'browserChart');
        });
		var url=$scope.mainurl+'search?q=totalLogouts&dateRange=day&country='+Country;
        $http({
				method : "GET",
				url : url,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(data, status, headers, config) {
               drawLineChart(data.results,'signout');
        });
    }
});