// DOMContentLoaded
document.addEventListener('DOMContentLoaded',function(){
	init_interface();
	if(!isSC()){
		onWebViewLoad('{"isWifi":"0"}');
	}
	SC_Imgcontroller.jpgLoad()
},false);


// 客户端调用方法  ↓↓↓
var PAGE_FLAG = {
	isWifi : "1"
}

// 滚动到评论锚点
function toComment(){
	var top = $("#anchor-comment")[0].offsetTop;
	var stop = document.body.scrollTop;
	$("html,body").animate({scrollTop:top},300)
}
// 新评论
function newComment(data){
	eval('data ='+data);
	var s_content = data.content.length>80?data.content.substr(0,72)+"...":data.content
    var l_content = data.content.length>80?data.content:null;
	var comment_data = {
		data:[
			{
				id:data.id,
				nickname: data.user.nickname,
				avatar: data.user.avatar,
				visible:"1",
				s_content: s_content,
				l_content: l_content,
				time: formatDate(data.time),
				like: data.likeCount,
			    r_nickname: data.replyTo==null?null:data.replyTo.user.nickname,
				r_content: data.replyTo==null?null:data.replyTo.content.substr(0,14)+"...",
				r_visible:"1"
			}
		]
	}
	
	//console.log(comment_data)
	var comment = template('temp-comment', comment_data);
	$("#comment-start").after(comment);
	loadflag.noComment = false;
	loadingUI();
	toComment();
}
function delComment(cid){
	$('.comment-i[data-comid="'+cid+'"]').fadeOut()
}
// wifi环境
function isWifi(data){
	eval('data ='+data);
	PAGE_FLAG.isWifi = data;
	console.log(PAGE_FLAG.isWifi)
}
// webView加载后执行
function onWebViewLoad(data){
	eval('data ='+data);
	console.log(data)
	PAGE_FLAG.isWifi = data.isWifi
	console.log(data.isWifi)
	SC_Imgcontroller.gifwrap()
	if(isSC()){
		SC_Imgcontroller.gifLoad(document.getElementById("art-text"))
	}else{
		SC_Imgcontroller.gifLoadall(document.getElementById("art-text"))
	}
	// if(data.isWifi == 0){
		
	// }else if(data.isWifi == 1){
	// 	
	// }
}
function onisWebViewLoad(data){
	onWebViewLoad(data)
}



// JS bridge ↓↓↓
	// 文章初始化数据
	function share_data(type){
		var s_title = SHARE_DATA.title==""?$("#art-title").html():SHARE_DATA.title;
		//var share_data = '{"type" : "'+type+'","title" : "'+s_title+'","url" : "'+location.href+'","image" : "'+SHARE_DATA.share_image+'","desc":"'+getDesc()+'","likeCount":"'+INIT_DATA.post_like+'","commentCount":"'+INIT_DATA.post_comment+'"}'
		var share_data = {
			type : type,
			title : s_title,
			url : location.href,
			image : SHARE_DATA.share_image,
			desc : getDesc(),
			likeCount : INIT_DATA.post_like,
			commentCount : INIT_DATA.post_comment
		}
		return JSON.stringify(share_data);
	}

	// 获取摘要
	function getDesc(){
		var text = SHARE_DATA.desc==""?$("#art-text").html():SHARE_DATA.desc;
		return text.replace(/(<[^>]+>)/g,"").replace(/(^\s+)|(\s+$)/g,"").substr(0,30);
	}

	// 分享初始化接口
	function init_interface(){
		if(isSC()){
			if(isIOS()){
				window.webkit.messageHandlers.onArticleInit.postMessage(share_data("all"))
			}else{
				window.score.onArticleInit(share_data("all"))
			}
			
		}else{
			console.log(share_data("all"))
		}
	}
	
	// 分享交互
	function share_interface(type){
		if(isSC()){
			if(isIOS()){
				window.webkit.messageHandlers.share.postMessage(share_data(type))
			}else{
				window.score.share(share_data(type))
			}
		}else{
			console.log(share_data(type))
		}
	}

	// 确定type的分享
	$(".share-i").each(function(){
		$(this).bind("click","",function(e){
			var t = $(e.target);
			var type = t.attr("data-type");
			share_interface(type);
		})
	})
	$(".bar-share").on("click",function(e){
		share_interface("all")
	})



	// 评论交互
	function comment_interface(cdata){
		if(isSC()){
			if(isIOS()){
				window.webkit.messageHandlers.comment.postMessage(cdata)
			}else{
				window.score.comment(cdata)
			}
		}else{
			console.log(cdata)
		}
	}

	// 专栏跳转
	function openSpecial(sdata){
		if(isSC()){
			if(isIOS()){
				window.webkit.messageHandlers.openSpecial.postMessage(sdata)
			}else{
				window.score.openSpecial(sdata)
			}
		}else{
			console.log(sdata)
		}
	}
	$(".writer-info").bind("click",function(){
		var sdata = $(this).attr("data-special");
		openSpecial(sdata)
	})



// 页内JS

// 加载评论-------------------

	var loadflag = {
		btime : getBtime(),
		loading : false,
		loadend : false,
		noComment : false
	}

	scroll_load();

	// 滚动事件
	function scroll_load(){

		var comment = $("#new-comment .comment-i")
		if(comment.length == 0){
			loadflag.loadend = true;
			loadflag.noComment = true;
			loadingUI();
		}else if(comment.length<INIT_DATA.comment_size){
			loadflag.loadend = true;loadingUI();
		}

		$(window).bind("scroll",function(){
			var screenH = document.documentElement.clientHeight;
			var pageH = document.body.clientHeight;

			//console.log(loadflag)
			// 判断是否到底部和没有正在加载
			if(scrollY>=pageH-screenH-50&&!loadflag.loading){
				// 是否数据已加载完
				if(!loadflag.loadend){
					more_comment();
				}else{
					loadingUI();
				}
			}
		})
	} 

	// 控制加载UI的变化
	function loadingUI(){
		if(loadflag.noComment){
			$("#c_load").show().addClass("end").removeClass("ing").html("暂无评论");
		}else if(loadflag.loading){
			$("#c_load").show()
		}else if(!loadflag.loading&&!loadflag.loadend){
			$("#c_load").show()
		}else if(loadflag.loadend){
			$("#c_load").show().addClass("end").removeClass("ing").html("没有更多了");
		}
	}

	// 加载更多评论
	function more_comment(){
		loadflag.loading = true;
		loadingUI();

		comment_datas = {
			data:[]
		};

		// if(loadflag.loading&&loadflag.loadend){return;}
		$.ajax({ 

            url: INIT_DATA.comment_api+"?1524",
            type: 'get',
            dataType: 'json',
            data:{p:INIT_DATA.post_id,b:loadflag.btime},
            success: function(rs){

            	if(rs.ret!=0){
            		console(rs.ret);
            		return;
            	}
            	// rs数据数组
            	var c = rs.data.comments;
            	// 数据条数
            	var s = parseInt(c.length);
            	// before time
            	
            	// 拼数据
            	if(s!=0){
            		loadflag.btime = c[s-1].time;
            		for(var i=0;i<c.length;i++){
            			//console.log(c[i])
            			var s_content = c[i].content.length>80?c[i].content.substr(0,72)+"...":c[i].content
            			var l_content = c[i].content.length>80?c[i].content:null;
	            		var comment_data = {
	            			id:c[i].id,
	            			visible:c[i].visibleStatus,
	            			del_official:null,
	            			del_self:null,
							nickname: c[i].user.nickname,
							avatar: c[i].user.avatar==""?INIT_DATA.init_avatar:c[i].user.avatar,
							s_content: s_content,
							l_content: l_content,
							time: formatDate(c[i].time),
							like: c[i].likeCount,
							islike: readLS(INIT_DATA.post_id,c[i].id)?"on":"",
						    r_nickname: c[i].replyTo==null?null:c[i].replyTo.user.nickname,
							r_content: c[i].replyTo==null?null:c[i].replyTo.content.substr(0,14)+"...",
							r_visible:c[i].replyTo==null?null:c[i].replyTo.visibleStatus
						}
						//comment_data = isDelComment(comment_data)
						comment_datas.data.push(comment_data);
	            	}
	            	console.log(comment_datas)
	                //刷模板
	                var comment = template('temp-comment', comment_datas);
					$("#comment-end").before(comment);
					setTimeout(function(){
						$(".comment-i.fade_in").removeClass("fade_in")
					},3000)
            	}
            	
				// 更新flag
				loadflag.loading = false;
				
				if(s<INIT_DATA.comment_size){
            		loadflag.loadend = true;
            	}
            	loadingUI();
            }
      	});
		
	}

	// 评论是否被删除
	// function isDelComment(data){
	// 	var data = data
	// 	if(data.visible == 2){
	// 		data.del_official = "1";
	// 	}else if(data.visible == 3){
	// 		data.del_self = "1";
	// 	}
	// 	return(data)
	// }

	// 传入时间戳转格式 
	function formatDate(d){
		var date = new Date(parseInt(d));
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
	
	// 获取btime
	function getBtime(){
		var n_comment = $("#new-comment time");
		var num = n_comment.length-1;
		//console.log($(n_comment[num]).attr("data-time"))
		return $(n_comment[num]).attr("data-time")
	}

	// 评论状态（本地存储） - localStorage
	var ls_comment = localStorage.COMMENT_LIKE_DATA;
	function writeLS(p,c){
		if(c == 0){
			return false;
		}

		ls_comment = localStorage.COMMENT_LIKE_DATA;
		if(typeof ls_comment!="undefined"){
			var like_data = JSON.parse(ls_comment)
			console.log(like_data[p])
			if(like_data[p] instanceof Array){
				like_data[p].push(c);
			}else{
				like_data[p] = [c]
			}
			
		}else{
			var like_data = {}
			like_data[p] = []
			like_data[p].push(c)
		}
		console.log(JSON.stringify(like_data))
		localStorage.COMMENT_LIKE_DATA = JSON.stringify(like_data)
	}

	function readLS(p,c){
		if(c == 0||typeof ls_comment=="undefined"){
			return false;
		}
		var like_data = JSON.parse(ls_comment)
		if(like_data[p] instanceof Array){
			var str = like_data[p].join(",")
			return str.match(c)
		}
	}

	// 检查点赞
	$(".comment-i").each(function(){
		if(readLS(INIT_DATA.post_id,$(this).attr("data-comid"))){
			$(this).find(".dolike").addClass("on")
		}
	})



// 显示更多-------------------
	$(".art-comment").on("click",".readmore",function(e){
		t = $(e.target);
		if(t.attr("data-all")){
			t.parent().find(".c-content").html(t.attr("data-all"))
		}
		t.hide()
	})

	// 出墙
	$(".art-more").bind("click",function(){
		if($(this).hasClass("on")){
			$(".art-moretext").hide()
			$(this).removeClass("on")
		}else{
			$(".art-moretext").show()
			$(this).addClass("on")
		}
		
	})
	


// 评论点赞-------------------
	$(".art-comment").on("click",".dolike",function(e){
		var t = $(e.target),
			n = parseInt(t.html()),
			cid = parseInt(t.parent().parent().attr("data-comid"));
		if(!t.hasClass("on")&&cid == "0"){
			t.html(n+1);
	       	t.addClass("on");
	       	return;
		}
		if(!t.hasClass("on")){
			$.ajax({
				url: INIT_DATA.like_api,
	            type: 'post',
	            dataType: 'json',
	            data:{c:cid},
	            success: function(rs){
	            	if(rs.ret==0){
	            		t.html(n+1)
	            		t.addClass("on")
	            		writeLS(INIT_DATA.post_id,cid)
	            	}
	            }
			})
		}
		e.stopPropagation();
	})



//评论交互 --回复、举报
	var p_event = {
		startY : 0,
		startX : 0,
		endY : 0,
		endX : 0
	}

	if(isPC()){
		$(".art-comment").on("mousedown",".comment-i",function(e){
			
			p_event.startX = e.pageX;
			p_event.startY = e.pageY;


			$t = $(e.target);
			if($t.hasClass("readmore")||$t.hasClass("dolike")){
				return
			}
			$(this).addClass("on")
			
	 	}).on("mouseup",".comment-i",function(e){
	 		p_event.endX = e.pageX;
			p_event.endY = e.pageY;

	 		$t = $(e.target);
			if($t.hasClass("readmore")||$t.hasClass("dolike")){
				return
			}
			$(this).removeClass("on")

			if(Math.abs(p_event.endY-p_event.startY)<3){
				var cdata = '{"cid": "'+$(this).attr("data-comid")+'","nickname" : "'+$(this).find(".user-name").html()+'","content" : "'+$(this).find(".c-content").html().substr(0,14)+"..."+'"}'
				comment_interface(cdata);
			}
			
	 	})
	}else{
		$(".art-comment").on("touchstart",".comment-i",function(e){
			e = e.originalEvent.changedTouches[0];
			p_event.startX = e.pageX;
			p_event.startY = e.pageY;
			$t = $(e.target);
			if($t.hasClass("readmore")||$t.hasClass("dolike")){
				return
			}
			$(this).addClass("on")
	 	}).on("touchmove",".comment-i",function(e){
			$(this).removeClass("on")
	 	}).on("touchend",".comment-i",function(e){
	 		e = e.originalEvent.changedTouches[0];
	 		p_event.endX = e.pageX;
			p_event.endY = e.pageY;

	 		$t = $(e.target);
			if($t.hasClass("readmore")||$t.hasClass("dolike")){
				return
			}
			$(this).removeClass("on")

			if(Math.abs(p_event.endY-p_event.startY)<10){
				var cdata = '{"cid": "'+$(this).attr("data-comid")+'","nickname" : "'+$(this).find(".user-name").html()+'","content" : "'+$(this).find(".c-content").html().substr(0,14)+"..."+'"}'
				comment_interface(cdata);

			}
			
	 	})
	}



// 文章点赞
	$(".bar-like").bind("click",function(){
		var t = $(this),
			n = parseInt($(this).html()),
			pid = $(this).attr("data-pageid");

		if(!t.hasClass("on")){
			$.ajax({
				url: INIT_DATA.pagelike_api,
	            type: 'post',
	            dataType: 'json',
	            data:{p:pid},
	            success: function(rs){
	            	if(rs.ret==0){
	            		t.html(n+1)
	            		t.addClass("on")
	            	}
	            }
			})
		}
	})

// 手机浏览器打开 提示下载APP

	document.addEventListener('DOMContentLoaded',function(){
		if(!isSC()&&!isPC()){
			var top = 0;
			$("#dl-bar").show();
			$(".wap-hide").hide()
			if(isIOS()){
				$("#dl-bar .dl-btn").bind("click",function(){

					location.href = DOWNLOAD_DATA.ios_link;
				})
			}else if(isAndroid()){
				$("#dl-bar .dl-btn").bind("click",function(){
					
					location.href = DOWNLOAD_DATA.android_link;
				})
			}
		}

	},false);
	


// 弹出提示
function popAlert(t){
	$(".g_prompt").remove();
	var prompt = "<div class='g_prompt' style='width: 380px;padding: 20px;color: #fff;background: rgba(0,0,0,0.7);position: fixed;left: 50%;top: 20%;margin-left: -215px;text-align: center;font-size: 32px;line-height: 52px;border-radius: 10px;z-index: 999;'>"+t+"</div>";
	$("#page_wrap").before(prompt)
	setTimeout(function(){
		$(".g_prompt").animate({"opacity":0},300)
	},1800)
}

// 图片懒加载
	// css动态加载
	
	var SC_Imgcontroller = {
		wrap : null,
		imgClass : "sc-imgctl",
		gifClass : "gif-wrap",
		jpgClass : "jpg-wrap",

		gifwrap : function(){
			var gifwrap = '<span class="sc-imgctl gif-wrap"></span>'
			$(".img-gif").wrap(gifwrap)
		},

		gifLoadall : function(wrap){
			var imglist = wrap.querySelectorAll("."+this.gifClass)
			
			for(var i=0;i<imglist.length;i++){
				var el = imglist[i].childNodes[0];
				if(el.getAttribute("data-original")){
					el.src=el.getAttribute("data-original");
					imglist[i].classList.add("on");
				}
			}
		},

		gifLoad : function(wrap){
			var t = this;
			t.wrap = wrap;
			$(t.wrap).on("click",".sc-imgctl",function(e){
				// 获取点击元素
				var tar = $(e.target)
				if(tar.find(".img-gif")[0].getAttribute("data-original")){
					
					if(tar&&e.target.classList.contains(t.gifClass)&&!e.target.classList.contains("on")){
						tar.find(".img-gif")[0].src=tar.find(".img-gif")[0].getAttribute("data-original");
						e.target.classList.add("on")
					}
				}
			})
		},

		// 依赖lazyload
		jpgLoad : function(){
			// 懒加载
			$("img.lazy").lazyload({
			    effect : "fadeIn",
			    threshold : 100
			});
		}
	}
	
// 分享代码
// 微信认证

var wx_config = {
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: 0, // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
}

$.ajax({
	url: "http://123.56.179.35:9080/wx/jssdkConfig",
	//url: "wx_Data.json",
    type: 'get',
    dataType: 'jsonp',
    data:{
    	url:encodeURI(location.href) 
    },
    success: function(rs){
    	wx_config.appId = rs.appId;
    	wx_config.timestamp = rs.timestamp;
    	wx_config.nonceStr = rs.nonceStr;
    	wx_config.signature = rs.signature;
    	wx_share(wx_config);
    }
})


function wx_share(config){
	wx.config(config)
	wx.error(function(res){
		console.log(res)
	});
	wx.ready(function(){
		wx.onMenuShareTimeline(wx_share_data);
    	wx.onMenuShareAppMessage(wx_share_data);
   	});
}

// 分项数据
var wx_share_data = {
	title: SHARE_DATA.title, // 分享标题
    desc: getDesc(), // 分享描述
    link: location.href, // 分享链接
    imgUrl: SHARE_DATA.share_image
}

// bug迭代区
// 修复iOS 1.0bug
function onisWebViewLoad(data){
	onWebViewLoad(data);
}

	

	




