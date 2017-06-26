/**
 * 作者： 戴科
 * 创建时间： 2017/5/18 10:00
 * 版本： [1.0, 2017/5/18]
 * 版权：江苏国泰新点软件有限公司
 * 描述：详情
 */
define(function(require, exports, moddive) {
	"use strict";
	var CommonTools = require('CommonTools_Core');
	var WindowTools = require('WindowTools_Core');
	var UITools = require('UITools_Core');
	var StringTools = require('StringTools_Core');
	var CommonAjaxTools = require('commonajax');
	var CommonApi = require('commonApi');
	var InfoID = '';
	var CateNum = '';
	var openId='';
	CommonTools.initReady(initData);
	/**
	 * @description 初始化数据,结合initReady使用
	 * plus情况为plusready
	 * 其它情况为直接初始化
	 */
	function initData() {
		CommonTools.importFile([
			'js/libs/mui.min.js',
			'js/libs/mustache.min.js',
			'js/libs/zepto.min.js',
		], function() {
			//初始化数据
			openId = WindowTools.getExtraDataByKey("openId");
			InfoID = WindowTools.getExtraDataByKey("InfoID");
			CateNum = WindowTools.getExtraDataByKey("CateNum");
			//获取信息详情
			Getcolumn()
		});
	};
	/**
	 * 获取详细信息
	 */
	function Getcolumn() {
		CommonAjaxTools.commonajax(CommonApi.GetInfodetail, {
			InfoID: InfoID,
			CateNum: CateNum,
			IsNeedUrl: '0',
		}, function(response) {
			if(response != '') {
				Zepto('.tit').text(response.title);
				Zepto('.date').text(response.infodate);
				Zepto('.content').append(response.infocontent);
			}
		});
	}
});