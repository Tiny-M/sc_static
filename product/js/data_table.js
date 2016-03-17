;(function($){
	$(".tap-i").each(function(i,dom){
		(function(i,dom){
			$(dom).bind("click",function(){
				$(dom).addClass("on");
				$(dom).siblings().removeClass("on")
				$(".table").hide()
				$($(".table")[i]).show()
			})
		})(i,dom)
	})
	// $(".tap-i").bind(event_ct(),function(){

	// })
})(jQuery)