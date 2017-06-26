/**
 * @description   移动开发框架
 * @author dailc  dailc 
 * @version 4.0
 * @time 2017-04-05
 * 下拉刷新的实现，实际项目中，一般是基于业务开发，所以直接使用这个tools下的下拉刷新即可
 * 这里面自动将一些每一个皮肤对应的css以及可能的兼容处理掉(比如native在h5下兼容default皮肤)
 * 当然如果不基于业务，也可以自定义实现，只需引入对应的依赖文件即可
 * 
 * 业务封装实现+mui default皮肤 
 * 基于mui的js与css
 */
define(function(require, exports, module) {
	// 引入实现的核心
	var PullRefreshImplCore = require('PullToRefresh_Bizlogic_Impl');
	//  引入下拉刷新的核心
	var PullRefreshBase = require('PullToRefresh_Skin_Mui_Default');
	
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