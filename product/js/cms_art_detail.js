var cmsControl = {
	popLayout : function(op,cl,m,p,func){
					var stop = document.body.scrollTop;
					op.bind("click",function(){
						func&&func($(this),p,m);
						stop = parseInt(document.body.scrollTop)
						var c_height = window.innerHeight;
						p.show()
						var min_height = parseInt(p.find(".pop-inner").css("height"))+80;
						var height;
						if(c_height > min_height){	
							height = c_height;
						}else{
							height = min_height;
						}
						console.log(height)
						m.css({"position":"fixed","top":-stop+"px"})
						p.css({"height":height,"display":"block"})
						document.body.scrollTop = 0;
					})
					cl.bind("click",function(e){
						p.hide();
						m.css({"position":"static"});
						document.body.scrollTop = stop;
					})
				},				


	// var art_data = {
	// 	data:[
	// 		{
	// 			title:"hahaha",
	// 			writer: "hahaha",
	// 			from: "新浪",
	// 			content: "<p>hahahaha</p><p><br></p><p><br></p><p><span style='color: rgb(52, 52, 52); font-family: 'Source Sans Pro', 'Open Sans', 'Helvetica Neue', 'WenQuanYi Micro Hei', 'Microsoft YaHei', 微软雅黑, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif; font-size: 16px; line-height: 27.2px; text-indent: 32px;'>法国杯的一场比赛在摩纳哥与圣让庞隆之间进行，比赛中摩纳哥中锋特劳雷在上半场24分钟内上演大四喜，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥10-2血洗圣让庞隆。</span><br></p>"
	// 		}
	// 	]
	// }
	show_artview : function(data){

					var comment = template('temp-article', data);
					$(".art-content").html(comment);
					$("#art-text").html(data.data[0].content)
					$(".art-content time").html(formatDate())

					function formatDate(){
						var date = new Date();
						var time =  addZero(date.getMonth()+1)+"-"+addZero(date.getDate())+" "+addZero(date.getHours())+":"+addZero(date.getMinutes())
						function addZero(n){
							if(n<10){
								return "0"+n;
							}else{
								return n;
					 		}
						}
						return time;
					}
				}
}


var art_data = {
		data:[
			{
				title:"2323",
				writer: "hahaha",
				from: "新浪",
				content: "<p>hahahaha</p><p><br></p><p><br></p><p><span style='color: rgb(52, 52, 52); font-family: 'Source Sans Pro', 'Open Sans', 'Helvetica Neue', 'WenQuanYi Micro Hei', 'Microsoft YaHei', 微软雅黑, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif; font-size: 16px; line-height: 27.2px; text-indent: 32px;'>法国杯的一场比赛在摩纳哥与圣让庞隆之间进行，比赛中摩纳哥中锋特劳雷在上半场24分钟内上演大四喜，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥上半场便5球领先，下半场再入5球，圣让庞隆也攻进两球。最终，摩纳哥10-2血洗圣让庞隆。</span><br></p>"
			}
		]
	}


var INIT_IMG_EDIT = {
	ratio : 16 / 9
}

function initImgEdit(item,p,m){
	$('#img-edit').attr({"src":item.attr("data-url")})
	$('#img-edit').cropper({
	    aspectRatio: INIT_IMG_EDIT.ratio,
	    crop: function(e) {
		    // Output the result data for cropping image.
		    console.log("----------------");
		    console.log(e.x);
		    console.log(e.y);
		    console.log(e.width);
		    console.log(e.height);
		    console.log(e.rotate);
		    console.log(e.scaleX);
		    console.log(e.scaleY);
		}
	});
	$(".edit-confirm").unbind();
	$(".edit-confirm").bind("click",function(){

		p.hide();
		m.css({"position":"static"});
		document.body.scrollTop = stop;

		
		item.attr({"src":"123"})
	})
}


// 弹出文章预览
cmsControl.popLayout($(".art_view_btn"),$("#article-view .bg"),$(".cms_wrap"),$("#article-view"),function(){
	cmsControl.show_artview(art_data)
})
cmsControl.popLayout($(".img-edit"),$(".img-edit-box .bg,.edit-confirm"),$(".cms_wrap"),$(".img-edit-box"),initImgEdit)


