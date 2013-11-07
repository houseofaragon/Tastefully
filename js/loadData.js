
/* load list of herbs */
var herb_list_one = ['sweet basil', 'mint', 'oregano', 'thyme', 'cilantro'];
var herb_list_two = ['dill', 'sage', 'rosemary', 'chives', 'parsely', 'tarragon', 'arugala'];
function loadHerbList(name, herb_list){
	for(herb in herb_list){
		$('ul#'+name).append(
			'<li> <a class="image" href="#"><img src="images/parsely.png"></img></a><h3 class="title">'+ herb_list[herb] +'</h3><div class="region">Mediterranean</div><div class="details">Goes great with italian dishes, and easy to grow, as well as cook.</div><a class="icon add" href="#">Get Creative</a></li>'
		);
	}
}
var herb_one_name='herb_list_one';
var herb_two_name='herb_list_two';
loadHerbList(herb_one_name, herb_list_one);
loadHerbList(herb_two_name, herb_list_two);

/* main content slider */
//http://fearlessflyer.com/2010/08/how-to-create-your-own-jquery-content-slider/
$("#tip1").on('click',function(){
	$("[id^='Tip-']").removeClass('current');
	$("[id^='tip']").removeClass('activeSlide');
	$("#Tip-1").fadeIn(1000);
	$("#Tip-1").addClass('current');
	$("[id^='Tip-']").not('.current').css("display","none");
	$("#tip1").addClass('activeSlide');
	return false;
});

$("#tip2").on('click',function(){
	$("[id^='Tip-']").removeClass('current');
	$("[id^='tip']").removeClass('activeSlide');
	$("#Tip-2").fadeIn(1000);
	$("#Tip-2").addClass('current');
	$("[id^='Tip-']").not('.current').css("display","none");
	$("#tip2").attr('class','activeSlide');
	return false;
});

$("#tip3").on('click',function(){
	$("[id^='Tip-']").removeClass('.current');
	$("[id^='tip']").removeClass('activeSlide');
	$("#Tip-3").fadeIn(1000);
	$("#Tip-3").addClass('current');
	$("[id^='Tip-']").not('.current').css("display","none");
	$("#tip2").attr('class','activeSlide');
	return false;
});

$("#tip4").on('click',function(){
	$("[id^='Tip-']").removeClass('.current');
	$("[id^='tip']").removeClass('activeSlide');
	$("#Tip-4").fadeIn(1000);
	$("#Tip-4").addClass('current');
	$("[id^='Tip-']").not('.current').css("display","none");
	$("#tip2").attr('class','activeSlide');
	return false;
});
/*---------------- slideshow --------------------- */
	