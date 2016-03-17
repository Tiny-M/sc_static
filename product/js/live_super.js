// websocket
function openWs(){
	var search = location.search.split("&")
	var chat_id = search[0].substr(search[0].indexOf("=")+1);

	console.log(chat_id)
	var ws = new WebSocket(INIT_DATA.webSocket_sever);
	ws.onmessage = function (mes) {     
   		console.log("webSocket:"+mes.data)
   		doWsData(mes.data)
	};
	ws.onopen = function () {
		console.log("已建立链接")
   		ws.send("chat_join,chat"+chat_id+",,")
	};
	ws.onclose = function() {    
	   console.log("WebSocket服务器关闭")
	};    
	ws.onerror = function(err) {    
	   console.log("Error: " + err);    
	};

	// 数据处理
	function doWsData(res){
		var type = res.replace(data,"").split(",")[0]

		if(type == "chat_recvlive"){
			var data = res.match(/{.+}/);
			eval("data = "+data)
			var arg = res.replace(data,"").split(",")
			var type = arg[0];
			var sub = arg[1];
			var time = arg[2];
			data["time"]=formatDate(time);
			if(typeof data.image[0] != "undefined"){
				// var img = "";
				// for(var i = 0;i<data.image.length;i++){
				// 	img += '<img class="lc-img" src="'+data.image[i]+'">'
			
				// }
				// data.image = img
			}else{
				data.image = null;
			}
			newContent(data)
		}
		

	}

	function formatDate(d){
		var date = new Date(parseInt(d));
		var time =  addZero(date.getHours())+":"+addZero(date.getMinutes())
		function addZero(n){
			if(n<10){
				return "0"+n;
			}else{
				return n;
	 		}
		}
		return time;
	}
	
	var mess_box = {
		hasMess : 0,
		message : ""
	}

	function newContent(data){
		console.log(data)
		var content = template('temp-comment', data);

		console.log(window.scrollY)
		if(window.scrollY>100){
			mess_box.hasMess = 1;
			mess_box.message += content;
			$(".new_alert").addClass("on")
		}else{
			$("#live-start").after(content);
			$(content).addClass("on")
		}
		
	}

	window.addEventListener("scroll",function showMess(){

		if(window.scrollY <100&&mess_box.hasMess == 1){
			$("#live-start").after(mess_box.message);
			mess_box.hasMess = 0;
			mess_box.message = "";
			$(".new_alert").removeClass("on")
		}
	})


	function wsClose(){
		ws.close()
	}
}

openWs()