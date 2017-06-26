/**
 * 作者： 戴科
 * 创建时间： 2017/6/15 16:00
 * 版本： [1.0, 2017/6/15]
 * 版权：江苏国泰新点软件有限公司
 * 描述： 信息列表页
 */
define(function(require, exports, module) {
	"use strict";
	/**
	 * 引入工具类
	 */
	var CommonTools = require('CommonTools_Core');
	var WindowTools = require('WindowTools_Core');
	var UITools = require('UITools_Core');
	var PullToRefreshTools = require('PullToRefresh_Impl_Default_Core');
	var CommonAjaxTools = require('commonajax');
	var CommonApi = require('commonApi');
	var Config = require('config_Bizlogic');
	/**
	 * 下拉刷新对象
	 */
	var pullToRefreshObj;
	/*
	 *服务器验证码 
	 */
	var Token = '';
	/**
	 * 用户唯一id
	 */
	var UserGuid = '';
	/**
	 * 获取的类型
	 */
	var CategoryNum = '0'
	/**
	 * 子栏目栏目号
	 */
	var catenum = '';
	// initready 要在所有变量初始化做完毕后
	CommonTools.initReady(initData);
	/**
	 * @description 初始化数据,结合initReady使用
	 * plus情况为plusready
	 * 其它情况为直接初始化
	 */
	function initData() {
		//引入必备文件,下拉刷新依赖于mui与mustache
		CommonTools.importFile([
			'js/libs/mui.min.js',
			'js/libs/mustache.min.js',
			'js/libs/zepto.min.js',
			'js/core/epoint.moapi.v2.js'
		], function() {
			//初始化页面参数
			CategoryNum = WindowTools.getExtraDataByKey('CategoryNum');
			//请求子栏目
			Getcolumn();
			//监听点击事件
			initlistern();
		});

	}
	/**
	 * 监听点击事件
	 */
	function initlistern() {
		Zepto('#sliderSegmentedControl').on('tap', '.mui-control-item', function() {
			catenum = Zepto(this).attr('id');
			pullToRefreshObj.refresh();
		});
	}
	/**
	 * 获取二级栏目
	 */
	function Getcolumn() {
		CommonAjaxTools.commonajax(CommonApi.getseccolumn, {
			"parentcategory": CategoryNum
		}, function(response) {
			console.log(JSON.stringify(response));
			var outdata = response.CateList.Cate;
			var temple = '<a class="mui-control-item " href="#xmpd001" id="{{CateNum}}">{{CateName}}</a>'
			var output = '';
			for(var i = 0; i < outdata.length; i++) {
				output += Mustache.render(temple, outdata[i]);
			}
			Zepto('#sliderSegmentedControl').append(output);
			switch(outdata.length) {
				case 1:
					Zepto('.mui-control-item').css('width', '100%');
					//必须设置宽度，栏目总条数的宽度（用来判断与屏幕的宽度，是否需要滑动）
					Zepto("#sliderSegmentedControl").css('width', '100%');
					break;
				case 2:
					Zepto('.mui-control-item').css('width', '50%');
					//必须设置宽度，栏目总条数的宽度（用来判断与屏幕的宽度，是否需要滑动）
					Zepto("#sliderSegmentedControl").css('width', '100%');
					break;
				case 3:
					Zepto('.mui-control-item').css('width', '33.33%');
					//必须设置宽度，栏目总条数的宽度（用来判断与屏幕的宽度，是否需要滑动）
					Zepto("#sliderSegmentedControl").css('width', '100%');
					break;
				default:
					Zepto("#sliderSegmentedControl").css('width', outdata.length * 100 + 'px');
					break;
			}
			Zepto('.mui-control-item').eq(0).addClass('mui-active');
			catenum = outdata[0].CateNum;
			ejs.oauth.getToken(function(result, msg, res) {
				Token = result.token;
				initPullRefreshList();
			});

		});
	}
	/**
	 * @description 初始化下拉刷新
	 */
	function initPullRefreshList() {
		//调用对应的接口地址
		var url = CommonApi.GetInfoList;
		var pageSize = 10;
		var getLitemplate = function(value) {
			var litemplate = '<li class="mui-table-view-cell" id="{{InfoID}}"><a class="mui-navigate-right">{{Title}}</a></li>';
			return litemplate;
		}
		var getData = function(currPage) {
			var requestData = {};
			//动态校验字段
			requestData.ValidateData = Token;
			var data = {
				isheadnews: '0',
				title: '',
				catenum: catenum,
				currentpageindex: currPage.toString(),
				pagesize: pageSize.toString(),
			};
			requestData.para = data;
			//某一些接口是要求参数为字符串的
			requestData = JSON.stringify(requestData);
			//alert(requestData + url);
			return requestData;
		};
		//成功回调
		var successRequestCallback = function(response) {
			ejs.nativeUI.closeWaiting();

		};
		//改变接口返回的数据
		var changeResponseDataCallback = function(response) {
			//alert(JSON.stringify(response))
			var realdata = [];
			if(response.EpointDataBody.DATA.ReturnInfo.Status != "True") {
				ejs.nativeUI.toast(response.EpointDataBody.DATA.ReturnInfo.Description);
				return false;
			}
			if(response.EpointDataBody.DATA.UserArea.InfoList) {
			realdata = response.EpointDataBody.DATA.UserArea.InfoList.Info;
				
			}
			//alert(JSON.stringify(realdata))
			return realdata;
		};
		var onClickCallback = function(e) {
			var InfoID = Zepto(this).attr('id');
			var data = {
				InfoID: InfoID,
				CateNum: catenum
			}
			ejs.page.openPage('html/home/ha_detail.html', '信息详情', data, {

			});
		};
		PullToRefreshTools.initPullDownRefresh({
			isDebug: true,
			up: {
				auto: true
			},
			bizlogic: {
				defaultInitPageNum: 1,
				getUrl: url,
				getRequestDataCallback: getData,
				changeResponseDataCallback: changeResponseDataCallback,
				successRequestCallback: successRequestCallback,
				getLitemplate: getLitemplate,
				itemClickCallback: onClickCallback

			},
			//三种皮肤
			//default -默认人的mui下拉刷新,webview优化了的
			//type1 -自定义类别1的默认实现, 没有基于iscroll
			//type1_material1 -自定义类别1的第一种材质
			skin: 'default'
		}, function(pullToRefresh) {
			pullToRefreshObj = pullToRefresh;
			//pullToRefreshObj.refresh();
		});
	}

});