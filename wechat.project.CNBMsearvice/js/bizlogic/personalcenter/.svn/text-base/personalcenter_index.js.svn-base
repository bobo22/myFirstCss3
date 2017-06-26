/**
 * 作者： 钱家冬
 * 创建时间： 2017/06/19 10:00
 * 版本： [1.0, 2017/06/19]
 * 版权：江苏国泰新点软件有限公司
 * 描述：个人中心模块首页
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
	var openId = '';
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
			'js/core/epoint.moapi.v2.js'
		], function() {
			// 初始化数据
			openId = WindowTools.getExtraDataByKey("openId");
			InfoID = WindowTools.getExtraDataByKey("InfoID");
			CateNum = WindowTools.getExtraDataByKey("CateNum");
			// 初始化监听
			initListener();
			// 获取信息详情
			// Getcolumn()
		});
	};
	
	/*
	 * @description 初始化监听
	 */
	function initListener() {
		// 点击我的办件
		mui('.mui-content').on('tap', '.my-deal', function() {
			var data = {
				userGuid: '',
				ouGuid: ''
			}
			ejs.page.openPage('html/personalcenter/my_deal.html', '我的办件', data, {
				showLoadProgress: true
			}, function(result, msg, detail) {

			});
		});
		// 点击我的预约
		mui('.mui-content').on('tap', '.my-reserve', function() {
			var data = {
				userGuid: '',
				ouGuid: ''
			}
			ejs.page.openPage('html/personalcenter/my_reserve.html', '我的预约', data, {
				showLoadProgress: true
			}, function(result, msg, detail) {

			});
		});
		// 点击我的分享
		mui('.mui-content').on('tap', '.my-share', function() {
			var data = {
				userGuid: '',
				ouGuid: ''
			}
			ejs.page.openPage('html/personalcenter/my_share.html', '我的分享', data, {
				showLoadProgress: true
			}, function(result, msg, detail) {

			});
		});
		// 点击我的评价
		mui('.mui-content').on('tap', '.my-evaluate', function() {
			var data = {
				userGuid: '',
				ouGuid: ''
			}
			ejs.page.openPage('html/personalcenter/my_evaluate.html', '我的评价', data, {
				showLoadProgress: true
			}, function(result, msg, detail) {

			});
		});
		// 点击我的收藏
		mui('.mui-content').on('tap', '.my-collect', function() {
			var data = {
				userGuid: '',
				ouGuid: ''
			}
			ejs.page.openPage('html/personalcenter/my_collect.html', '我的收藏', data, {
				showLoadProgress: true
			}, function(result, msg, detail) {

			});
		});
		// 点击我的设置
		mui('.mui-content').on('tap', '.my-setting', function() {
			var data = {
				userGuid: '',
				ouGuid: ''
			}
			ejs.page.openPage('html/personalcenter/my_setting.html', '我的设置', data, {
				showLoadProgress: true
			}, function(result, msg, detail) {

			});
		});
	}

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