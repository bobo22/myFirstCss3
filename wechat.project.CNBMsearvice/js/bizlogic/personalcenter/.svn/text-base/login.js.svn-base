/**
 * 作者： 钱家冬
 * 创建时间： 2017/06/21 15:50
 * 版本： [1.0, 2017/06/21]
 * 版权：江苏国泰新点软件有限公司
 * 描述：登录
 */
define(function(require, exports, moddive) {
	"use strict";
	var CommonTools = require('CommonTools_Core');
	var WindowTools = require('WindowTools_Core');
	var UITools = require('UITools_Core');
	var StringTools = require('StringTools_Core');
	var CommonAjaxTools = require('commonajax');
	var CommonApi = require('commonApi');

	/*
	 * 账号
	 */
	var loginid = '';
	/*
	 * 密码
	 */
	var passWord = '';

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
		// 点击登录
		mui('.btn').on('tap', '.btn-blue', function() {
			loginid = Zepto('#loginid').val();
			passWord = Zepto('#password').val();
			if(loginid == '') {
				ejs.nativeUI.toast('请输入账号！');
				return false;
			}
			if(passWord == '') {
				ejs.nativeUI.toast('请输入密码！');
				return false;
			}
			if(loginid != '' && passWord != '') {
				login();
			}
		});
		// 点击注册账号
		mui('.btn-txt').on('tap', '.register', function() {
			var data = {

			}
			ejs.page.openPage('', '注册账号', data, {
				showLoadProgress: true
			}, function(result, msg, detail) {

			});
		});
		// 点击忘记密码
		mui('.btn-txt').on('tap', '.forgetpwd', function() {
			var data = {

			}
			ejs.page.openPage('', '忘记密码', data, {
				showLoadProgress: true
			}, function(result, msg, detail) {

			});
		});
	}

	/*
	 * @description 
	 */
	function login() {
		CommonAjaxTools.commonajax(CommonApi.GetInfodetail, {
			loginid: loginid,
			passWord: passWord
		}, function(response) {
			ejs.page.openPage('', '登录', {
				loginid: loginid,
				passWord: passWord
			}, {
				'showLoadProgress': true
			}, function(result, msg, detail) {

			})
		});
	}

	/**
	 * @description 获取详细信息
	 */
	function Getcolumn() {
		//		CommonAjaxTools.commonajax(CommonApi.GetInfodetail, {
		//			InfoID: InfoID,
		//			CateNum: CateNum,
		//			IsNeedUrl: '0',
		//		}, function(response) {
		//			if(response != '') {
		//				Zepto('.tit').text(response.title);
		//				Zepto('.date').text(response.infodate);
		//				Zepto('.content').append(response.infocontent);
		//			}
		//		});
	}
});