/*
*	tastefully.js
*   author: Karen C.Aragon
*   version 0.1
*/


/*---------------- MAIN PAGE: slideshow --------------------- */
/* main content slider */
//http://fearlessflyer.com/2010/08/how-to-create-your-own-jquery-content-slider/
$("#tip1").on('click',function(){
	$("[id^='Tip-']").removeClass('current');
	$("[id^='tip']").removeClass('activeSlide');
	$("#tip1").attr('class','activeSlide');
	$("#Tip-1").addClass('current');
	$("[id^='Tip-']").not('.current').css("display","none");
	$("#Tip-1").fadeIn(1000);
	return false;
});

$("#tip2").on('click',function(){
	$("[id^='Tip-']").removeClass('current');
	$("[id^='tip']").removeClass('activeSlide');
	$("#tip2").attr('class','activeSlide');
	$("#Tip-2").addClass('current');
	$("[id^='Tip-']").not('.current').css("display","none");
	$("#Tip-2").fadeIn(1000);
	return false;
});

$("#tip3").on('click',function(){
	$("[id^='Tip-']").removeClass('current');
	$("[id^='tip']").removeClass('activeSlide');
	$("#tip3").attr('class','activeSlide');
	$("#Tip-3").addClass('current');
	$("[id^='Tip-']").not('.current').css("display","none");
	$("#Tip-3").fadeIn(1000);
	return false;
});

$("#tip4").on('click',function(){
	$("[id^='Tip-']").removeClass('current');
	$("[id^='tip']").removeClass('activeSlide');
	$("#tip4").attr('class','activeSlide');
	$("#Tip-4").addClass('current');
	$("[id^='Tip-']").not('.current').css("display","none");
	$("#Tip-4").fadeIn(1000);
	return false;
});



/* ----------- MAIN PAGE: load list of herbs  ------------------*/
var herb_list_one = ['sweet basil', 'mint', 'oregano', 'thyme', 'cilantro'];
var herb_list_two = ['dill', 'sage', 'rosemary', 'chives', 'parsely', 'tarragon', 'arugala'];
function loadHerbList(name, herb_list){
	for(herb in herb_list){
		$('ul#'+name).append(
			'<li> <a class="image" href="subpage.html"><img src="images/parsely.png"></img></a><h3 class="title">'+ herb_list[herb] +'</h3><div class="region">Mediterranean</div><div class="details">Goes great with italian dishes, and easy to grow, as well as cook.</div><a class="icon add" id="'+ herb_list[herb] +'" href="subpage.html">Get Creative</a></li>'
		);
	}
}
var herb_one_name='herb_list_one';
var herb_two_name='herb_list_two';
loadHerbList(herb_one_name, herb_list_one);
loadHerbList(herb_two_name, herb_list_two);

 /* ----------- SUB PAGES: append data  ------------------*/
$('.add').on('click', function(){
	console.log($(this).attr('id'));
	$.getJSON( "data/herb.json", function( data ) {
	  	console.log(JSON.stringify(data));
	  	var items = [];
	  	$.each( data, function( key, val ) {
	  		if($(this).attr('id') === key){
	  	 	items.push( "<li id='" + key + "'>Native to: " + val['native'] + "</li>" );
	  	  	items.push( "<li id='" + key + "'>Greatest Height: " + val['height'] + "</li>" );
	  	  	items.push( "<li id='" + key + "'>Most ideal environment: " + val['treat'] + "</li>" );
	  	  	items.push( "<li id='" + key + "'>Family name:" + val['family'] + "</li>" );
	  	  	items.push( "<li id='" + key + "'>Species name:" + val['species'] + "</li>" );
	  	  	items.push( "<li id='" + key + "'>Typical uses: " + val['uses'] + "</li>" );
	  	  	items.push( "<li id='" + key + "'>Medicinal uses:" + val['medical'] + "</li>" );
	  	  	items.push( "<li id='" + key + "'>Characteristics: " + val['characteristics'] + "</li>" );
	  	  	 $("."+key).html(items.join( "" ));
	  	  	}
	  	});
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

	