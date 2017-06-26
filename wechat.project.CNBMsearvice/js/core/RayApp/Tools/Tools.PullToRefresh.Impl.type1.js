/**
 * @description   移动开发框架
 * @author dailc  dailc 
 * @version 4.0
 * @time 2017-01-18
 * 功能模块:
 * 下拉刷新type1皮肤的实现，由于采用了webpack打包模式，
 * 所以皮肤都应该在初始化时就已经确定
 */
define(function(require, exports, module) {
	var CommonTools = require('CommonTools_Core');
	//引入css皮肤支持
	CommonTools.importFile('js/core/RayApp/Tools/Tools.PullToRefresh.css');
	// 引入实现的核心
	var PullRefreshImplCore = require('PullToRefresh_Impl_Core');
	//  引入下拉刷新的核心
	var PullRefreshBase = require('PullToRefresh_Base_Type1_Core');
	
	/**
	 * @description 初始化下拉刷新
	 * @param {JSON} options 传入的参数
	 * @param {Function} 成功生成后,回调下拉刷新对象
	 * 因为皮肤是通过异步加载的,所以必须通过回调进行
	 */
	exports.initPullDownRefresh = function(options, callback) {
		options = options || {};
		
		// 设置下拉刷新实例
		options.targetPullToRefresh = PullRefreshBase;
		
		var instance = PullRefreshImplCore.initPullDownRefresh(options,callback);
		
		return instance;
	};     
});