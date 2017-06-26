/**
 * 作者: libo
 * 时间: 2017-03-21 
 * 描述: 自定义的公用方法
 */
define(function(require, exports, module) {

	//页面通用ajax地址前缀
	exports.serverUrl = 'http://192.168.205.222/';
	//标准版地址
	exports.standardlink = 'http://192.168.205.222/';
	/*
	 
	 * description 页面通用ajax请求
	 * 传参 data
	 * url: ajax请求地址
	 * option： 传参参数
	 * extraoption： 页面配置信息（目前只包括Content-Type）
	 * successcallback 成功回调
	 * isshow 是否弹出调试信息true or false，默认false
	 * */
	exports.aJAXP = function(data) {
			//获取传参信息以及处理
			var url = data.url,
				option = JSON.stringify(data.options),
				contenttype = data.extraoption == '' ? 'application/x-www-form-urlencoded' : data.extraoption,
				successcallback = data.successcallback,
				isshow = data.isshow == undefined ? false : data.isshow;
			var allurl = exports.serverUrl + url;
			showWay(isshow, allurl + ' ' + option);
			//调用ajax
			mui.ajax(allurl, {
				data: option,
				dataType: "json",
				type: "POST",
				headers: {
					'Content-Type': contenttype
				},
				success: function(response) {
					showWay(isshow, JSON.stringify(response));
					if(response.ReturnInfo.Code == "0") {
						showWay(isshow,response.ReturnInfo.Description);
						return false;
					}
					if(response.BusinessInfo.Code == "0") {
						showWay(isshow, response.BusinessInfo.Description);
						return false;
					}
					successcallback(response);
				},
				error: function(response) {
					showWay(isshow,'请求失败');
					showWay(isshow,JSON.stringify(response))
				}
			});
		}
	exports.aJAXS = function(data) {
			//获取传参信息以及处理
			var url = data.url,
				option = JSON.stringify(data.options),
				contenttype = data.extraoption == '' ? 'application/x-www-form-urlencoded' : data.extraoption,
				successcallback = data.successcallback;
				isshow = data.isshow == undefined ? false : data.isshow;

			var allurl = exports.standardlink + url;
			showWay(isshow, allurl + ' ' + option);
			//调用ajax
			mui.ajax(allurl, {
				data: option,
				dataType: "json",
				type: "POST",
				headers: {
					'Content-Type': contenttype
				},
				success: function(response) {
					showWay(isshow, JSON.stringify(response));
					if(response.ReturnInfo.Code == "0") {
						showWay(isshow,response.ReturnInfo.Description);
						return false;
					}
					if(response.BusinessInfo.Code == "0") {
						showWay(isshow, response.BusinessInfo.Description);
						return false;
					}
					successcallback(response);
				},
				error: function(response) {
					showWay(isshow,'请求失败');
					showWay(isshow,JSON.stringify(response));
				}
			});
		}
		/*
		 
		 * 获取当前时间 格式 
		 * 如下几种格式  YYYY-MM-DD HH:MM:SS || YYYY-MM-DD HH:MM || YYYY-MM-DD 其中字母可用符号或者字母替代
		 * */
	exports.getDate = function(kind) {
		var kind; //返回事件格式
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if(month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if(strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}

		var arraytime = kind.split(' ');
		if(arraytime.length == 1) {
			currentdate += date.getFullYear() + seperator1 + month + seperator1 + strDate;
		} else {
			var arrayafter = arraytime.split(':');
			if(arrayafter.length == 2) {
				currentdate += date.getFullYear() + seperator1 + month + seperator1 + strDate +
					" " + date.getHours() + seperator2 + date.getMinutes()
			} else {
				currentdate += date.getFullYear() + seperator1 + month + seperator1 + strDate +
					" " + date.getHours() + seperator2 + date.getMinutes() +
					seperator2 + date.getSeconds();
			}
		}
		//var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
		return currentdate;
	}

	function showWay(isshow, content) {
		if(isshow) {
			return alert(content);
		} else {
			return console.log(content);
		}
	}
	

});