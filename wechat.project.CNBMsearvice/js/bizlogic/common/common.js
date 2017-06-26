/**
 * 描述 :通用js 
 * 作者 :Created By sunzl(孙尊路)
 * 版本 :1.0.0
 * 时间 :2016-11-23 08:20:08
 */
define(function(require, exports, module) {
	"use strict";
	var CommonTools = require('CommonTools_Core');
	/**
	 * @description ajax请求方式均为mui请求，在此之前，需解决跨域“”
	 * @param {Object} url 服务接口地址
	 * @param {Object} requestData 请求参数
	 * @param {Object} successRequestCallback  成功回调
	 * @param {Object} errorRequestCallback  失败回调
	 * @param {Object} options {isDebug} 配置参数  打印调试信息以及头部信息
	 */
	exports.ajax = function(url, requestData, successCallBack, errorCallBack, options) {
		//打印调试信息optional settings
		options = options || {};
		if(typeof(options.isDebug) !== "string" && options.isDebug) {
			var debugInfo = {
					"服务接口地址：": url,
					"服务接口参数：": requestData
				}
				//格式化输出
				//newlineAfterColonIfBeforeBraceOrBracket: true, //在'['or'{'之后换行
				//spaceAfterColon: false //冒号：后面加空格
				///console.error(formatJson(debugInfo, {newlineAfterColonIfBeforeBraceOrBracket: true,spaceAfterColon: false}));
				//简单压缩输出
			if(typeof(requestData) == "string") {
				console.error("开始请求...(地址&参数)\n" + url + "\n" + "" + requestData + "\n");
			} else {
				console.error("开始请求...(地址&参数)\n" + url + "\n" + "" + JSON.stringify(requestData) + "\n");
			}
		}
		//发送ajax请求
		mui.ajax(url, {
			data: requestData,
			dataType: "json",
			timeout: "15000", //超时时间设置为3秒；
			type: "POST",
			contentType: "application/json;charest=UTF-8",
			//contentType:"json",			
			success: function(response) {
				if(successCallBack && typeof(successCallBack) == "function") {
					successCallBack(response);
				}
			},
			error: function(xhr, type, errorThrown) {
				if(errorCallBack && typeof(errorCallBack) == "function") {
					errorCallBack(xhr, type, errorThrown);
				}
			}
		});
	};
	/**
	 * @description 该方法和Zepto("tap","selector",function(){})一样，都是遍历相同的dom元素并为之绑定监听事件
	 * @param {Object} tap 点击事件
	 * @param {Object} selector 选择器
	 * @param {Object} itemClickCallback 点击回调  
	 */
	exports.addEventListener = function(tap, selector, itemClickCallback) {
		[].forEach.call(document.querySelectorAll(selector), function(item, index) {
			item.addEventListener(tap, function() {
				var _this = this;
				if(typeof(itemClickCallback) == "function" && itemClickCallback) {
					itemClickCallback(item, index);
				}
			});
		});
	};
	/**
	 * @description 获取某个元素的所有兄弟节点;这里还是建议使用库来实现 ，喜欢深究的可以参考下面代码（原理类似Zepto,jquery 的silbling()方法）。
	 * @param {Object} elem  选中的当前节点
	 * @param {Function} forCB  遍历回调每个兄弟节点
	 * 用法如下：
	 */
	exports.sibling = function(elem, forCB) {
		var r = [];
		var n = elem.parentNode.firstChild;
		for(; n; n = n.nextSibling) {
			if(n.nodeType === 1 && n !== elem) {
				if(forCB && typeof(forCB) == "function") {
					forCB(n);
				}
				//r.push(n);
			}
		}
		//统一返回兄弟节点（数组）
		//return r;
	};
});