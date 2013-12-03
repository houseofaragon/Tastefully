/*
*	tastefully.js
*   author: Karen C.Aragon
*   version 0.1
*/


/*---------------- MAIN PAGE: slideshow --------------------- */
/* main content slider */
$(document).ready(function(){
	$("#recipe-selector nav a").click(function(e) {
		e.preventDefault();
		$("#recipe-selector nav a").removeClass();
		$(this).addClass("activeSlide");
		var tipID = "#Tip-"+$(this).html();
		$(".recipe.current").removeClass("current").fadeOut(500, function() {
			$(tipID).fadeIn(500);
			$(tipID).addClass("current");
		});		
		$()
	});
});

/* ----------- MAIN PAGE: load list of herbs  ------------------*/
/*var herb_list_one = ['basil', 'mint', 'oregano', 'thyme', 'cilantro','dill', 'sage', 'rosemary', 'parsely'];
var herb_list_one = ['basil', 'mint', 'oregano', 'thyme', 'cilantro','dill', 'sage', 'rosemary', 'parsely'];
*/
var herb_list_one ={ 
     basil:["basil", "South East Asia" , "Goes great with Italian dishes or Asian dishes and easy to grow."], 
     mint:["mint","Mediterranean" ,"From toothpaste to tea, one of the most versatile herbs around."], 
     oregano:["oregano" ,"Mediterranean", "Pizza wouldn't be the same without this herb."],
     thyme:["thyme","Mediterranean", "Spray around doorways and windows in summer to repel insects."],
     cilantro:["cilantro" ,"Mediterranean", "Easily confused with flat-leaf parsley in appearance, so be sure to sniff carefully. "],
     dill:["dill","Mediterranean", "Dill is a carminative, aromatic, anti-spasmodic, galactogogue."],
     sage:["sage","Mediterranean", "The desire of sage is to render man immortal."],
     rosemary:["rosemary","Mediterranean", "As for rosemary, I let it run all over my garden walls."],
     parsely:["parsely","Mediterranean", "A great deal of the best European cooking is unthinkable without parsley"]

};

	for(var key in herb_list_one){
		$('ul#herb_list_one').append(
			'<li> <a class="image" href="blog/all-about-' + herb_list_one[key][0]+'"><img src="images/' + herb_list_one[key][0]+'.png"></img></a><h4 class="title">' + herb_list_one[key][0] +'</h4><div class="region">'+ herb_list_one[key][1]+'</div><div class="details">'+ herb_list_one[key][2]+ '</div><a class="icon add" href="blog/all-about-'+ herb_list_one[key][0] +'">Get Creative</a></li>'
		);
	}



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
	var width = 1024,
	  	height = 500;

	var projection = d3.geo.mercator()
		//two-element array of longitude and latitude in degrees [0,0]
		.translate([480, 400])
	    .center([0, 0])
	    .scale(250)
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
	           .style("fill", "#C77826")
	           .on("mouseover", function(d){
	           		tooltip.style("visibility", "visible");
  					tooltip.style("left", (d3.event.pageX + 10) + "px");
  					tooltip.style("top", (d3.event.pageY - 40) + "px");    
  					tooltip.html('<img class="left small-img" src="images/basil.png"/> ' +d.city + ' - '+ d.country + '<br/> - - - <br/>'+ d.desc );
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

/* ----  word animation ---*/
$(function() {

    changer();
});

function changer() {
    var words = ["creative","inventive","experimental","imaginative"];
    var idx = Math.floor(words.length * Math.random());
    $('#change').text(words[idx]).show('slow');
    var time = Math.floor(2000);
    setTimeout(changer,time);
}