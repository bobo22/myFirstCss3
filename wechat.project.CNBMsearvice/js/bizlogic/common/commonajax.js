/**
 * 作者 :戴科
 * 创建时间 :2017/05/23 21:37:21
 * 版本 :[1.0, 2017/5/23]
 * 版权：江苏国泰新点软件有限公司
 * 描述：通用ajax以及处理回调
 */
define(function(require, exports, module) {
	"use strict";
	var debug = false;
	var ejs = require('EJS_Core');
	/**
	 * 引入des加密工具类
	 */
	var DES3Tools = require('DES3Tools_Core');
	/**
	 *des加密的key 
	 */
	var key = "epoint**yb##";
	/**
	 * 通用的ajax请求
	 * @param {Object} url请求路径
	 * @param {Object} data 请求参数
	 * @param {Object} successcallback
	 * @param {Object} signtoken 额外的token验证，用在某些特殊的接口上，参数可选，非必选
	 */
	exports.commonajax = function(realurl, data, successcallback,signtoken) {
		ejs.oauth.getToken(function(result, msg, detail) {
			var token = result.token;
			if(signtoken){
				token=signtoken;
			}
			var url = realurl;
			var requestData = {};
			//动态校验字段
			requestData.ValidateData = '';
			requestData.para = data;
			requestData = JSON.stringify(requestData);
			//alert('请求数据:' + requestData + realurl)
			if(debug) {
				ejs.nativeUI.showDebugDialog('请求数据:' + requestData + realurl);
				console.log( requestData + realurl);
			}
			mui.ajax(url, {
				data: requestData,
				dataType: "json",
				type: "POST",
				success: function(response) {
					if(debug) {
						ejs.nativeUI.showDebugDialog(JSON.stringify(response));
						console.log(JSON.stringify(response));
					}
					if(response.EpointDataBody.DATA.ReturnInfo.Status != "True") {
						ejs.nativeUI.toast(response.EpointDataBody.DATA.ReturnInfo.Description);
						return false;
					}
					//成功回调
					successcallback(response.EpointDataBody.DATA.UserArea);

				},
				error: function(response) {
					console.log('请求失败');
					console.log(JSON.stringify(response));
					if(debug) {
						ejs.nativeUI.showDebugDialog(JSON.stringify(response));
					} else {
						ejs.nativeUI.toast('网络链接超时！');
					}

				}
			});
		});

	}
	/**
	 * 通用的获取用户信息的ajax请求
	 * @param {Object} url请求路径
	 * @param {Object} data 请求参数
	 * @param {Object} successcallback
	 * @param {Object} signtoken 额外的token验证，用在某些特殊的接口上，参数可选，非必选
	 */
	exports.commongetinfoajax = function(realurl, data, successcallback,signtoken) {
		ejs.oauth.getToken(function(result, msg, detail) {
			var token = result.token;
			if(signtoken){
				token=signtoken;
			}
			var url = realurl;
			var requestData = {};
			//动态校验字段
			requestData.ValidateData = token;
			requestData.paras = data;
			requestData = JSON.stringify(requestData);
			
			requestData = DES3Tools.encrypt(key, requestData);
			//alert('请求数据:' + requestData + realurl)
			if(debug) {
				ejs.nativeUI.showDebugDialog('请求数据:' + requestData + realurl);
				console.log( requestData + realurl);
			}
			mui.ajax(url, {
				data: requestData,
				dataType: "json",
				type: "POST",
				contentType: 'application/json;charset=UTF-8',
				success: function(response) {
					if(debug) {
						ejs.nativeUI.showDebugDialog(JSON.stringify(response));
						console.log(JSON.stringify(response));
					}
					if(response.ReturnInfo.Code == "0") {
						ejs.nativeUI.toast(response.ReturnInfo.Description);
						return false;
					}
					if(response.BusinessInfo.Code == "0") {
						ejs.nativeUI.toast(response.BusinessInfo.Description);
						return false;
					}
					//成功回调
					successcallback(response);

				},
				error: function(response) {
					console.log('请求失败');
					console.log(JSON.stringify(response));
					if(debug) {
						ejs.nativeUI.showDebugDialog(JSON.stringify(response));
					} else {
						ejs.nativeUI.toast('网络链接超时！');
					}

				}
			});
		});

	}
});