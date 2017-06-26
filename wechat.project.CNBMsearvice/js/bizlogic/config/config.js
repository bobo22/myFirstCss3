/**
 * 作者: dailc
 * 时间: 2016-05-21 
 * 描述: 项目中用到的通用config文件 
 */
define(function(require, exports, module) {
     //是否正式发布
    exports.isFormal = false;
    //是否使用Mock,优先级高于前面的url
    exports.isUserMock = false;
	//usersession key
	exports.userSessionKey = 'UserSessionKey_showcase';
	//settingSession key
	exports.settingSessionKey = 'SettingSessionKey_showcase';
	//oauth key 包括授权和登录等
	exports.oauthSessionKey = 'OauthSessionKey_showcase';
	//全局服务器地址
	exports.serverUrl = '';
	//全局验证参数
	exports.validateData = 'Epoint_WebSerivce_**##0601';
	//更新文件地址 
	exports.updateFileUrl = '';
	//F9框架相关
	var isRestFul = true;
	var rootUrl = 'http://192.168.205.99:8080/EpointFrame/';

	
	if(isRestFul) {
		rootUrl += 'rest/';
	}
	exports.isRestFul = isRestFul;
	exports.rootUrl = rootUrl;
	/**
	 * 匿名函数中进行全局配置
	 */
	(function() {
		//正式地址
		var serverUrl_formal = 'http://218.4.136.117:800/';
		var udateFileUrl_formal = '';
		//测试地址
		var serverUrl_test = 'http://info.haian.gov.cn:86/AppService/appservice/';
		var udateFileUrl_test = '';
		//mock地址
		var serverUrl_mock = '';
		if (exports.isFormal === true) {
			exports.serverUrl = serverUrl_formal;
			exports.spdateFileUrl = udateFileUrl_formal;
		}  else{
			exports.serverUrl = serverUrl_test;
			exports.updateFileUrl = udateFileUrl_test;
		}
		//mock重写
		if( exports.isUserMock===true){
			exports.serverUrl = serverUrl_mock;
		}
	})(); 
});