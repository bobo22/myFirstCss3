/**
 * 作者: dailc
 * 时间: 2017-01-19
 * 描述: 钉钉模式下对ejs 的模块进行增强
 * 增强的模块:
 * nativeUI模块
 * navigator部分功能
 * ddComponent 钉钉平台下独特的一些api
 */
define(function(require, exports, module) {
	"use strict";
	var CommonTools = require('CommonTools_Core');
	var ejs = require('Ejs_Core');

	function extendFucObj(moduleName, obj) {
		ejs.extendFucObj(moduleName, obj);
		for(var item in obj) {
			//对外暴露api
			exports[item] = obj[item];
		}
	}

	//单例对话框对象 h5情况
	var h5DialogObj = null;
	/**
	 * h5的 waiting dialog模块
	 */
	(function(obj) {
		obj.showWaiting = function(title, options) {
			return new H5WaitingDialog(title, options);
		};
		/**
		 * @description h5版本waiting dialog的构造方法
		 * @constructor
		 */
		function H5WaitingDialog(title, options) {
			//h5版本,构造的时候生成一个dialog
			this.loadingDiv = createLoading();
			document.body.appendChild(this.loadingDiv);
			this.setTitle(title);
			if(options && options.padlock == true) {
				//如果设置了点击自动关闭
				var that = this;
				this.loadingDiv.addEventListener('click', function() {
					that.close();
				});
			}
		};
		/**
		 * @description 设置提示标题方法,重新显示
		 */
		H5WaitingDialog.prototype.setTitle = function(title) {
			title = title || '';
			if(this.loadingDiv) {
				//只有存在对象时才能设置
				this.loadingDiv.style.display = 'block';
				this.loadingDiv.querySelector('.tipsContent').innerText = title;
			} else {
				console.error('h5 dialog对象已经销毁,无法再次显示');
			}
		};
		/**
		 * @description 关闭后执行的方法,这里只是为了扩充原型
		 */
		H5WaitingDialog.prototype.onclose = function() {

		};
		/**
		 * @description 设置关闭dialog
		 */
		H5WaitingDialog.prototype.close = function() {
			if(this.loadingDiv) {
				this.loadingDiv.style.display = 'none';
				this.onclose();
			}
		};
		/**
		 * @description 销毁方法
		 */
		H5WaitingDialog.prototype.dispose = function() {
			//将loadingDiv销毁
			this.loadingDiv && this.loadingDiv.parentNode && this.loadingDiv.parentNode.removeChild(this.loadingDiv);
		};
		/**
		 * @description 通过div和遮罩,创建一个H5版本loading动画(如果已经存在则直接得到)
		 * 基于mui的css
		 */
		function createLoading() {
			var loadingDiv = document.getElementById("MFRAME_LOADING");
			if(!loadingDiv) {
				//如果不存在,则创建
				loadingDiv = document.createElement("div");
				loadingDiv.id = 'MFRAME_LOADING';
				loadingDiv.className = "mui-backdrop mui-loading";
				//自己加了些样式,让loading能够有所自适应,并且居中
				loadingDiv.innerHTML = '<span class=" mui-spinner mui-spinner-white" style=" width: 20%;height: 20%;max-width:46px;max-height: 46px;position:absolute;top:46%;left:46%;"></span><span class="tipsContent" style="position:absolute;font-size: 14px;top:54%;left:46%;text-align: center;">加载中...</span>';
			}
			return loadingDiv;
		};
	})(exports.h5WaitingDialog = {});

	//actionsheet
	(function() {
		function createActionSheetH5(options) {
			options = options || {};
			var finalHtml = '';
			var idStr = options.id ? 'id="' + options.id + '"' : '';
			finalHtml += '<div ' + idStr + ' class="mui-popover mui-popover-action mui-popover-bottom">';
			//加上title
			if(options.title) {
				finalHtml += '<ul class="mui-table-view">';
				finalHtml += '<li class="mui-table-view-cell">';
				finalHtml += '<a class="titleActionSheet"><b>' + options.title + '</b></a>';
				finalHtml += '</li>';
				finalHtml += '</ul>';
			}
			finalHtml += '<ul class="mui-table-view">';
			//添加内容
			if(options.items && Array.isArray(options.items)) {
				for(var i = 0; i < options.items.length; i++) {
					var title = options.items[i] || '';
					finalHtml += '<li class="mui-table-view-cell">';

					finalHtml += '<a >' + title + '</a>';

					finalHtml += '</li>';
				}
			}
			finalHtml += '</ul>';
			//加上最后的取消
			finalHtml += '<ul class="mui-table-view">';
			finalHtml += '<li class="mui-table-view-cell">';
			finalHtml += '<a class="cancelActionSheet"><b>取消</b></a>';
			finalHtml += '</li>';
			finalHtml += '</ul>';

			//补齐mui-popover
			finalHtml += '</div>';
			return finalHtml;
		};
		//基于options 创建h5 actionsheet
		exports.createActionSheetShow = function(options, callback) {
			options.id = options.id || 'defaultActionSheetId';
			var html = createActionSheetH5(options);
			//console.log('添加html:'+html);
			if(document.getElementById('actionSheetContent') == null) {
				//不重复添加
				var wrapper = document.createElement('div');
				wrapper.id = 'actionSheetContent';
				wrapper.innerHTML = html;
				document.body.appendChild(wrapper);
				mui('body').on('shown', '.mui-popover', function(e) {
					//console.log('shown:'+e.detail.id, e.detail.id); //detail为当前popover元素
				});
				mui('body').on('hidden', '.mui-popover', function(e) {
					//console.log('hidden:'+e.detail.id, e.detail.id); //detail为当前popover元素
				});
				//监听
				mui('body').on('tap', '.mui-popover-action li>a', function(e) {
					var title = this.innerText;

					//console.log('class:' + mClass);
					//console.log('点击,title:' + title + ',value:' + value);
					if(this.className.indexOf('titleActionSheet') == -1) {
						//排除title的点击
						mui('#' + options.id).popover('toggle');
						if(this.className.indexOf('cancelActionSheet') == -1) {
							//排除取消按钮,回调函数
							callback && callback(title);
						}
					}
				});
			} else {
				//直接更改html
				document.getElementById('actionSheetContent').innerHTML = html;
			}
			//显示actionsheet
			mui('#' + options.id).popover('toggle');
		};
	})();

	/***********拓展NativeUI模块******************
	 * 所有参数和ejs保持一致就行了 
	 */
	extendFucObj('nativeUI', {
		'toast': function(options) {
			var msg = '';
			options = options || {};
			if(typeof options === 'string') {
				msg = options;
			} else {
				msg = options.message;
			}
			//钉钉环境
			if(CommonTools.os.dd) {
				dd.device.notification.toast({
					icon: '', //icon样式，有success和error，默认为空 0.0.2
					text: msg || '', //提示信息
					duration: 2, //显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
					delay: 0, //延迟显示，单位秒，默认0
					onSuccess: function(result) {
						/*{}*/
					},
					onFail: function(err) {}
				});
				mui.toast(msg);
			} else if(!CommonTools.os.ejs) {
				//非ejs
				mui.toast(msg);
			}
		},
		//callback目前只有钉钉中有用
		'alert': function(options, callback) {
			var title = '',
				msg = '',
				btn = '';
			options = options || {};
			if(typeof options === 'string') {
				msg = options;
				title = arguments[1] || '';
				btn = arguments[2] || '';
				callback = arguments[3] || null;
			} else {
				msg = options.message;
				title = options.title;
				btn = options.btn;
			}
			msg = msg || '';
			title = title || "提示";
			btn = btn || '确定';
			if(CommonTools.os.dd) {
				dd.device.notification.alert({
					message: msg,
					title: title, //可传空
					buttonName: btn,
					onSuccess: function() {
						//onSuccess将在点击button之后回调
						/*回调*/
						callback && callback();
					},
					onFail: function(err) {
						error && error();
					}
				});
			} else if(!CommonTools.os.ejs) {
				//非ejs环境
				mui.alert(msg, title, btn, callback);
			}
		},
		'confirm': function(options, callback) {
			options = options || {};

			if(typeof options === 'string') {
				options = {
					'message': options
				};
				if(typeof arguments[1] === 'string') {
					options.title = arguments[1];
					if(typeof arguments[2] === 'object') {
						btnArray = arguments[2];
						callback = arguments[3];
					} else {
						callback = arguments[2];
					}

				}
			}
			var msg = options.message || '';
			var title = options.title || "提示";
			var btnArray = [];
			var btn1 = options.btn1 || '取消';
			var btn2 = options.btn2 || (options.btn2 !== null ? '确定' : '');
			btn1 && btnArray.push(btn1);
			btn2 && btnArray.push(btn2);

			if(CommonTools.os.dd) {
				dd.device.notification.confirm({
					message: msg,
					title: title,
					buttonLabels: btnArray,
					onSuccess: function(result) {
						//onSuccess将在点击button之后回调
						/*
						{
						    buttonIndex: 0 //被点击按钮的索引值，Number类型，从0开始
						}
						*/
						var index = -1 * (result.buttonIndex + 1);
						var res = {
							'code': 1,
							'msg': '',
							'result': {
								"which": index
							},
							'detail': result
						};
						callback && callback(res.result, res.msg, res);
					},
					onFail: function(err) {}
				});
			} else if(!CommonTools.os.ejs) {
				mui.confirm(msg, title, btnArray, function(e) {
					//index得转成ejs相应的index
					var index = -1 * (e.index + 1);
					var res = {
						'code': 1,
						'msg': '',
						'result': {
							"which": index
						}
					};
					callback && callback(res.result, res.msg, res);
				});
			}

		},
		//ejs下暂时没有title与options属性这个属性
		//padlock  点击自动关闭--目前只有这个兼容h5版本
		'showWaiting': function(title, options) {
			title = title || '';
			options = options || {};
			if(CommonTools.os.dd) {
				dd.device.notification.showPreloader({
					text: title || "等待中...", //loading显示的字符，空表示不显示文字
					showIcon: true, //是否显示icon，默认true
					onSuccess: function() {
						/*{}*/

					},
					onFail: function(err) {

					}
				});
			} else if(!CommonTools.os.ejs) {
				if(h5DialogObj == null) {
					h5DialogObj = exports.h5WaitingDialog.showWaiting(title, options);
				} else {
					h5DialogObj.setTitle(title);
				}
				return h5DialogObj;
			}

		},
		'closeWaiting': function() {
			if(CommonTools.os.dd) {
				dd.device.notification.hidePreloader({
					onSuccess: function(result) {
						/*{}*/
					},
					onFail: function(err) {}
				});
			} else if(!CommonTools.os.ejs) {
				if(h5DialogObj) {
					h5DialogObj.dispose();
					h5DialogObj = null;
				}
			}

		},
		'actionSheet': function(options, callback) {
			options = options || {};
			options.items = options.items || [];
			var title = options.title || ''
			if(CommonTools.os.dd) {
				dd.device.notification.actionSheet({
					title: title, //标题
					cancelButton: '取消', //取消按钮文本
					otherButtons: options.items,
					onSuccess: function(result) {
						//onSuccess将在点击button之后回调
						/*{
						    buttonIndex: 0 //被点击按钮的索引值，Number，从0开始, 取消按钮为-1
						}*/
						var index = result.buttonIndex;
						var content = options.items[index];
						var res = {
							'code': 1,
							'msg': '',
							'result': {
								"which": index,
								"content": content
							}
						};
						callback && callback(res.result, res.msg, res);
					},
					onFail: function(err) {
						error && error();
					}
				});
			} else if(!CommonTools.os.ejs) {
				exports.createActionSheetShow(options, function(title) {
					var index = options.items.indexOf(title);
					var res = {
						'code': 1,
						'msg': '',
						'result': {
							"which": index,
							"content": title
						}
					};
					callback && callback(res.result, res.msg, res);
				});
			}

		},
	});

	/***********拓展navigator模块******************
	 * 所有参数和ejs保持一致就行了 
	 */
	extendFucObj('navigator', {
		'setTitle': function(title) {
			title = title || '';
			if(CommonTools.os.dd) {
				dd.biz.navigation.setTitle({
					title: title, //控制标题文本，空字符串表示显示默认文本
					onSuccess: function(result) {

					},
					onFail: function(err) {}
				});
			}
		},
		'setRightTextBtn': function(title, callback) {
			title = title || '';
			if(CommonTools.os.dd) {
				dd.biz.navigation.setRight({
					show: title ? true : false, //控制按钮显示， true 显示， false 隐藏， 默认true
					control: callback ? true : false, //是否控制点击事件，true 控制，false 不控制， 默认false
					text: title || '', //控制显示文本，空字符串表示显示默认文本
					onSuccess: function(result) {
						//如果control为true，则onSuccess将在发生按钮点击事件被回调
						/*
						{}
						*/
						callback && callback(result);
					},
					onFail: function(err) {
						//设置按钮失败，可以提示
					}
				});
			}
		},
		//ejs中是用popwindow来实现
		'setRightMenu': function(backgroundColor, items, callback) {
			if(CommonTools.os.dd) {
				dd.biz.navigation.setMenu({
					backgroundColor: backgroundColor,
					items: items,
					onSuccess: function(data) {
						callback && callback(data);
					},
					onFail: function(err) {}
				});
			}
		}
	});

	/*****另外拓展ejs中不存在的api***************
	 * 这种API只适合与钉钉平台 
	 */
	extendFucObj('ddComponent', {
		/**
		 * @description 选择通讯录,将一些逻辑都封装起来,简化使用
		 * @param {JSON} options 选项
		 * @param {Function} callback 回调函数
		 */
		'chooseContactPerson': function(options, callback) {
			exports.actionSheet({
				'title': '打开类别',
				'items': ['整个公司选择', '本部门选择']
			}, function(result) {
				var index = result.which;
				if(index === -1) {
					return;
				}
				//默认为整个公司选择
				var type = 0;
				if(index === 1) {
					//部门选择
					type = -1;
				}
				dd.biz.contact.choose({
					//默认要整个公司进行选择
					startWithDepartmentId: type, //-1表示打开的通讯录从自己所在部门开始展示, 0表示从企业最上层开始，(其他数字表示从该部门开始:暂时不支持)
					multiple: true, //是否多选： true多选 false单选； 默认true
					users: options.userGuidList, //默认选中的用户列表，userid；成功回调中应包含该信息
					corpId: options.corpId, //企业id
					max: options.currMaxChooseCount, //人数限制，当multiple为true才生效，可选范围1-1500
					onSuccess: function(data) {
						//onSuccess将在选人结束，点击确定按钮的时候被回调
						/* data结构
						  [{
						    "name": "张三", //姓名
						    "avatar": "http://g.alicdn.com/avatar/zhangsan.png" //头像图片url，可能为空
						    "emplId": '0573', //userid
						   },
						   ...
						  ]
						*/
						callback && callback(data);

					},
					onFail: function(err) {}
				});
			});
		},
		/**
		 * @description 将文件转存到钉盘
		 * @param {JSON} options 选项
		 * @param {Function} callback 回调函数
		 */
		'saveFileToDP': function(options, callback) {
			options = options || {};
			dd.biz.cspace.saveFile({
				corpId: options.corpId,
				url: options.url,
				name: options.name || '匿名文件',
				onSuccess: function(data) {
					/* data结构
					{"data":
					   [
					   {
					   "corpId": "", //公司id
					   "spaceId": "" //空间id
					   "fileId": "", //文件id
					   "fileName": "", //文件名
					   "fileSize": 111111, //文件大小
					   "fileType": "", //文件类型
					   }
					   ]
					}
					*/
					ejs.nativeUI.toast('转到钉盘成功');
					callback && callback(data);
				},
				onFail: function(err) {
					ejs.nativeUI.toast('转到钉盘失败...');
				}
			});
		},
		/**
		 * @description 钉住,发钉,不是钉盘
		 * @param {JSON} options
		 * @param {Function} callback
		 */
		'postDing': function(options, callback) {
			options = options || {};
			dd.biz.ding.post({
				//用户列表，默认为用户自己
				users: options.users,
				corpId: options.corpId, //企业id
				type: options.type, //钉类型 1：image  2：link
				alertType: options.alertType || 2,
				alertDate: options.alertDate,
				attachment: options.attachment,
				text: options.text, //消息
				onSuccess: function() {
					callback && callback();
				},
				onFail: function() {}
			});
		},
		/**
		 * @description 上传拍照图片，可以得到照片
		 * @param {JSON} options
		 * @param {Function} callback
		 */
		'uploadImageFromCamera': function(options, callback) {
			options = options || {};
			dd.biz.util.uploadImageFromCamera({
				compression: options.compression, //(是否压缩，默认为true)
				onSuccess: function(result) {
					callback && callback(result);
					//onSuccess将在图片上传成功之后调用
					/*
					[
					  'http://gtms03.alicdn.com/tps/i3/TB1VF6uGFXXXXalaXXXmh5R_VXX-237-236.png'
					]
					*/
				},
				onFail: function() {}
			});
		},
		/**
		 * @description 上传相册，可以得到照片
		 * @param {JSON} options
		 * @param {Function} callback
		 */
		'uploadImage': function(options, callback) {
			options = options || {};
			dd.biz.util.uploadImage({
				multiple: options.multiple, //是否多选，默认false
				max: options.max, //最多可选个数
				onSuccess: function(result) {
					callback && callback(result);
					//onSuccess将在图片上传成功之后调用
					/*
					[
					  'http://gtms03.alicdn.com/tps/i3/TB1VF6uGFXXXXalaXXXmh5R_VXX-237-236.png'
					]
					*/
				},
				onFail: function() {}
			});
		},
		/**
		 * @description 处理附件，是决定用钉盘还是下载
		 * @param {JSON} options 参数
		 */
		dealWithAttachFile: function(options) {
			options = options || {};
			var url = options.url||'';
			var name = options.name||'';
			var corpId = options.corpId||'';
			var itemsArray = ['转到钉盘', '直接下载'];
			if(CommonTools.os.ios) {
				//iOS下只支持rar,zip的下载
				if(url.toLowerCase().indexOf('.zip') === -1 &&
					url.toLowerCase().indexOf('.rar') === -1) {
					itemsArray.splice(1, 1);
				}
			}
			ejs.nativeUI.actionSheet({
				'title': '选择',
				'items': itemsArray
			}, function(result) {
				var index = result.which;
				if(index === 0) {
					//url = 'http://218.4.136.114:7009/EpointMobilePlatform6/test.xlsx';
					ejs.ddComponent.saveFileToDP({
						corpId: corpId,
						url: url,
						name: name
					});
				} else if(index === 1) {
					window.location.href = url;
				}
			});
		},
	});

	/*****另外覆盖ejs中的一些已有api***************
	 * 比如openPage需要重新改写逻辑
	 * 目前只支持单个覆盖
	 * 目前不会自动暴露出去，只会覆盖已有
	 */
	(function() {
		var oldOpenPage = ejs.page.openPage;
		//覆盖openPage,默认关闭钉钉中的分享
		ejs.extendFuc('page', 'openPage', function(url, title, jsonObj, options, callback, error) {
			jsonObj = jsonObj || {};
			options = options || {};
			url = ejs.app.appendParams(url, jsonObj);
			if(ejs.os.dd) {
				if(url.indexOf('?') === -1) {
					url += '?';
				} else {
					url += '&';
				}
				url += 'dd_share=false';
				console.log("url:"+url);
				document.location.href = url;
			} else {
				oldOpenPage(url, title, jsonObj, options, callback, error);
			}

		}, true);
	})();
});