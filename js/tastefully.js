/*
*	tastefully.js
*   author: Karen C.Aragon
*   version 0.1
*/


/*---------------- MAIN PAGE: slideshow --------------------- */
/* main content slider */
$(document).ready(function(){
	$("#recipe-selector nav a").click(function() {
		$("#recipe-selector nav a").removeClass();
		$(this).addClass("activeSlide");
		var tipID = "#Tip-"+$(this).html();
		$(".recipe.current").removeClass("current").fadeOut(500, function() {
			$(tipID).fadeIn(500);
			$(tipID).addClass("current");
		});		
	});
});

/* ----------- MAIN PAGE: load list of herbs  ------------------*/
var herb_list_one = ['basil', 'mint', 'oregano', 'thyme', 'cilantro'];
var herb_list_two = ['dill', 'sage', 'rosemary', 'parsely'];
function loadHerbList(name, herb_list){
	for(herb in herb_list){
		$('ul#'+name).append(
			'<li> <a class="image" href="subpage.html"><img src="images/' + herb_list[herb] +'.png"></img></a><h4 class="title">'+ herb_list[herb] +'</h4><div class="region">Mediterranean</div><div class="details">Goes great with italian dishes, and easy to grow, as well as cook.</div><button class="icon add" id="' + herb_list[herb] +'">Get Creative</button></li>'
		);
	}
}
var herb_one_name='herb_list_one';
var herb_two_name='herb_list_two';
loadHerbList(herb_one_name, herb_list_one);
loadHerbList(herb_two_name, herb_list_two);

 /* ----------- SUB PAGES: append data  ------------------*/

$('button.add').on('click', function(){
	var herb = $(this).attr('id');

	$.getJSON( "data/herb.json", function( data ) {
	  	//alert(JSON.stringify());
	  	var items = [];
	  	$.each( data, function( key, val ) {
	  		//alert(herb);
	  		if(herb === key){
	  		items.push( "<p>" + key + "</p>");
	  	 	items.push( "<li id='" + key + "'><span>Native to: </span> " + val['native'] + "</li>" );
	  	  	items.push( "<li id='" + key + "'><span>Greatest Height: </span> " + val['height'] + "</li>" );
	  	  	items.push( "<li id='" + key + "'><span>Most ideal environment: </span> " + val['treat'] + "</li>" );
	  	  	items.push( "<li id='" + key + "'><span>Family name: </span>" + val['family'] + "</li>" );
	  	  	items.push( "<li id='" + key + "'><span>Species name: </span>" + val['species'] + "</li>" );
	  	  	items.push( "<li id='" + key + "'><span>Typical uses: </span> " + val['uses'] + "</li>" );
	  	  	items.push( "<li id='" + key + "'><span>Medicinal uses: </span>" + val['medical'] + "</li>" );
	  	  	items.push( "<li id='" + key + "'><span>Characteristics: </span> " + val['characteristics'] + "</li>" );
	  	  	$(".herb-data").show();
	  	  	$(".herb-data").html();

	  	  	$(".herb-data").html(items.join(""));
	  	  	}

	  	});
	  	console.log(JSON.stringify(items));
	});
	
});



/*---------------- MAIN PAGE: d3 map --------------------- */

//http://techslides.com/d3-world-maps-tooltips-zooming-and-queue/
	var width = 960,
	  	height = 500;

	var projection = d3.geo.mercator()
		//two-element array of longitude and latitude in degrees [0,0]
		.translate([480, 300])
	    .center([0, 0])
	    .scale(150)
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
	           .attr("r", 7)
	           .style("fill", "#F78181")
	           .on("mouseover", function(d){
	           		tooltip.style("visibility", "visible");
  					tooltip.style("left", (d3.event.pageX + 10) + "px");
  					tooltip.style("top", (d3.event.pageY - 40) + "px");    
  					tooltip.html('<img class="left small-img" src="images/basil.png"/> ' +d.city + ','+ d.country + '<br/> - - - <br/>'+ d.desc );
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

	