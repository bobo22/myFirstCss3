/**
 * @description   移动开发框架
 * @author dailc  dailc 
 * @version 4.0
 * @time 2017-04-05
 * 下拉刷新的实现，实际项目中，一般是基于业务开发，所以直接使用这个tools下的下拉刷新即可
 * 这里面自动将一些每一个皮肤对应的css以及可能的兼容处理掉(比如native在h5下兼容default皮肤)
 * 当然如果不基于业务，也可以自定义实现，只需引入对应的依赖文件即可
 * 
 * 业务封装实现+Native皮肤 
 * 这个皮肤做了以下兼容处理，在ejs或钉钉环境下，依赖于对应的库文件
 * 否则，则兼容使用默认的default皮肤
 * 
 */
define(function(require, exports, module) {
	var CommonTools = require('CommonTools_Core');
	// 引入实现的核心
	var PullRefreshImplCore = require('PullToRefresh_Bizlogic_Impl');
	//  引入下拉刷新的核心
	var PullRefreshBase = require('PullToRefresh_Skin_Native');
	//	引入h5下的兼容
	var PullRefreshH5 = require('PullToRefresh_Skin_Mui_Default');
	//css支持
	require('PullToRefresh_Skin_Css');
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
		if(CommonTools.os.ejs||CommonTools.os.dd) {
			options.targetPullToRefresh = PullRefreshH5;
		}
		var instance = PullRefreshImplCore.initPullDownRefresh(options,callback);
		
		return instance;
	};     
});