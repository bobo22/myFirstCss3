/**
 * @description   移动开发框架
 * @author dailc  dailc 
 * @version 4.0
 * @time 2017-01-18
 * 功能模块:
 * 本来应该只是default皮肤的刷新，这里仍然兼容了下老版本的(所以老版本的skin仍然能兼容者使用)
 */
define(function(require, exports, module) {
	var CommonTools = require('CommonTools_Core');
	// 引入实现的核心
	var PullRefreshImplCore = require('PullToRefresh_Impl_Core');
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
		var generatePullToRefreshCallback = function(targetPullToRefresh) {
			PullRefreshBase = targetPullToRefresh;
			
			// 设置下拉刷新实例
			options.targetPullToRefresh = PullRefreshBase;
			// 生成示例
			PullRefreshImplCore.initPullDownRefresh(options,callback);
		};
		//默认是default
		options.skin = options.skin || 'default';
		if(options.skin === 'default') {
			require.async('PullToRefresh_Base_Default_Core', generatePullToRefreshCallback);
		} else if(options.skin === 'type0') {
			require.async('PullToRefresh_Base_Type0_Core', generatePullToRefreshCallback);
		} else {
			//其它皮肤都需要引入css
			CommonTools.importFile('js/core/RayApp/Tools/Tools.PullToRefresh.css');
			if(options.skin === 'type1') {
				require.async('PullToRefresh_Base_Type1_Core', generatePullToRefreshCallback);
			} else if(options.skin === 'type1_material1') {
				require.async('PullToRefresh_Base_Type1__Material1_Core', generatePullToRefreshCallback);
			} else if(options.skin === 'type2') {
				if(CommonTools.os.ejs||CommonTools.os.dd) {
					compatibleEJS(options.bizlogic.pullrefreshId);
					require.async('PullToRefresh_Base_Type2_Core', generatePullToRefreshCallback);
				} else {
					//h5模式用type0皮肤
					require.async('PullToRefresh_Base_Type0_Core', generatePullToRefreshCallback);
				}
				
			} else {
				console.error("错误:传入的下拉刷新皮肤错误,超出范围!");
			}
		}

	};
});