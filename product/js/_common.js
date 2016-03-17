
	/*
	* 客户端验证
	*/
	function isPC() {
		var userAgentInfo = navigator.userAgent;
		var Agents = ["Android", "iPhone",
			"SymbianOS", "Windows Phone",
			"iPad", "iPod"
		];
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}
	function isIOS(){
		return navigator.userAgent.match(/iPhone/);
	}
	function isAndroid(){
		return navigator.userAgent.match(/Android/);
	}
	function isWX(){
		return navigator.userAgent.match(/MicroMessenger/);
	}
	function isSC(){
		return navigator.userAgent.match(/ScoreSport/);
	}
	function isWeibo(){
		return navigator.userAgent.match(/Weibo/);
	}

	window.ENV = {
		isPC: isPC,
		isIOS: isIOS,
		isAndroid: isAndroid
	};

	/*
	* 如果移动设备是高分屏及以下的设备，则进行相应的缩放 
	*/

	if(parseFloat(window.devicePixelRatio) < 3 && !ENV.isPC()){

		if(isAndroid()&&isSC()){
			setTimeout(function(){
				setPredeal();
			},300)
		}else{
			setPredeal()
		}

		function setPredeal(){
			if(window.innerWidth < 750){
				var viewport = document.getElementById('viewport');
				viewport.content = "width=" + window.innerWidth+"target-densitydpi=device-dpi,user-scalable=no";
				zoom = window.innerWidth/750;
				document.documentElement.style.zoom = zoom;
				
				window.AdaptFunc&&window.AdaptFunc(zoom)
			}
			
		}
	}


