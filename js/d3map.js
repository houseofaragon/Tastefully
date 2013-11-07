//http://techslides.com/d3-world-maps-tooltips-zooming-and-queue/
		var width = 960,
		  	height = 500;

		var projection = d3.geo.mercator()
			//two-element array of longitude and latitude in degrees [0,0]
			.translate([480, 300])
		    .center([0, 0])
		    .scale(200)
		    //.rotate([-180,0]);

		var svg = d3.select("#map")
			.append("svg")
		    .attr("width", width)
		    .attr("height", height);

		var path = d3.geo.path()
		    .projection(projection);

		var g = svg.append("g");

		var tooltip = d3.select("#map")
			.append("div")
			.attr("class","tooltip")
			.style("position", "absolute")
			.style("z-index", "10")
			.style("visibility", "hidden")
			.text("a simple tooltip");

		// load and display the World
		d3.json("json/world-110m2.json", function(error, topology) {
		    g.selectAll("path")
		      // need to changed to feature, look at json
		      .data(topojson.feature(topology, topology.objects.countries)
		          .features)
		      .enter()
		      .append("path")
		      .attr("d", path)

		      // labels for regions
		      d3.csv("data/cities.csv", function(error, data) {
		        g.selectAll("circle")
		           .data(data)
		           .enter()
		           .append("circle")
		           .attr("cx", function(d) {
		            	return projection([d.lon, d.lat])[0];
		           })
		           .attr("cy", function(d) {
		                return projection([d.lon, d.lat])[1];
		           })
		           .attr("r", 10)
		           .style("fill", "#F78181")
		           .on("mouseover", function(d){
		           		tooltip.style("visibility", "visible");
      					tooltip.style("left", (d3.event.pageX + 10) + "px");
      					tooltip.style("top", (d3.event.pageY - 40) + "px");    
      					tooltip.html(d.city + ','+ d.country + '<br/>'+ d.desc );
		           		return tooltip;
		           	})
		           .on("mouseout", function(){return tooltip.style("visibility", "hidden");})
				});
		});

		var zoom = d3.behavior.zoom()
		    .on("zoom",function() {
		        g.attr("transform","translate("+ 
		            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
		        g.selectAll("path")  
		            .attr("d", path.projection(projection)); 
		});
		//svg.call(zoom);
