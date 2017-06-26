/**
 * @description   移动开发框架
 * @author dailc  dailc 
 * @version 4.0
 * @time 2017-01-18
 * 功能模块:
 * 下拉刷新第二种皮肤的实现，由于采用了webpack打包模式，
 * 所以皮肤都应该在初始化时就已经确定
 */
define(function(require, exports, module) {
	var CommonTools = require('CommonTools_Core');
	CommonTools.importFile('js/core/RayApp/Tools/Tools.PullToRefresh.css');
	// 引入实现的核心
	var PullRefreshImplCore = require('PullToRefresh_Impl_Core');
	//  引入下拉刷新的核心
	var PullRefreshBase = require('PullToRefresh_Base_Type2_Core');
	//  引入下拉刷新的核心
	var PullRefreshBaseType0 = require('PullToRefresh_Base_Type0_Core');
	/**
	 * @description 兼容ejs情况下的下拉刷新
	 * 去除多余dom
	 * @param {HTMLElement} elem 对应的dom
	 */
	function compatibleEJS(elem) {
		//计划改变，ejs下拉刷新不使用scroll,否则不好计算什么时候可以滑动，而是直接去除这个dom
		//		mui(elem).scroll({
		//			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		//		});
		if(typeof elem === 'string') {
			elem = document.getElementById(elem);
		}
		if(CommonTools.os.ejs || CommonTools.os.dd) {
			//去除dom,ejs下拉刷新不需要scroll
			var pullRefreshDom = elem;
			pullRefreshDom.classList.remove('mui-scroll-wrapper');
			var scrollDom = pullRefreshDom.querySelector('.mui-scroll');
			if(scrollDom) {
				//pullRefreshDom.innerHTML = scrollDom.innerHTML;
				scrollDom.classList.remove('mui-scroll');
			}
		} else {
			//浏览器环境
			PullRefreshBase = PullRefreshBaseType0;
		}

	}
	/**
	 * @description 初始化下拉刷新
	 * @param {JSON} options 传入的参数
	 * @param {Function} 成功生成后,回调下拉刷新对象
	 * 因为皮肤是通过异步加载的,所以必须通过回调进行
	 */
	exports.initPullDownRefresh = function(options, callback) {
		options = options || {};
		
		// type2的皮肤是需要兼容ejs的
		compatibleEJS(options.bizlogic.pullrefreshId||'pullrefresh');
		
		// 设置下拉刷新实例
		options.targetPullToRefresh = PullRefreshBase;
		
		var instance = PullRefreshImplCore.initPullDownRefresh(options,callback);
		
		return instance;
	};     
});