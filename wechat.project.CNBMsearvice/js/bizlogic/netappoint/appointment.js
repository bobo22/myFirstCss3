/**
 * 作者： 李波
 * 创建时间： 2017/06/20 10:00
 * 版本： [1.0, 2017/5/18]
 * 版权：江苏国泰新点软件有限公司
 * 描述：预约办理
 */
define(function(require, exports, moddive) {
	"use strict";
	var CommonTools = require('CommonTools_Core');
	var WindowTools = require('WindowTools_Core');
	var UITools = require('UITools_Core');
	var StringTools = require('StringTools_Core');

	var _Z,
		doc = document;

	//头部两个模块切换获取
	var appointHandle = doc.getElementById('appointhandle'),
		searchAppoint = doc.getElementById('searchappoint');
	//获取初始化dom元素
	var title = doc.getElementById('mui-title'),
		changeTitle = doc.getElementById('changetitle'),
		headerChange = doc.getElementById('headerchange'),
		funChange = doc.getElementById('funchange'),
		searchChange = doc.getElementById('searchchange'),
		mask = doc.getElementById('mask'),
		sideContent = doc.getElementById('sidecontent'),
		sideListContent = doc.getElementById('sidelistcontent');

	//获取列表的dom元素
	var contentOption = doc.getElementById('content-option'),
		btnWrite = doc.getElementById('btnwrite'),
		allMask = doc.getElementById('allmask'),
		adviceTop = doc.getElementById('advice_top'),
		adviceBottom = doc.getElementById('advice_bottom');

	CommonTools.initReady(initData);

	function initData() {
		CommonTools.importFile([
			'css/mui.picker.min.css',
			'css/mui.poppicker.css',
			'js/libs/mui.min.js',
			'js/libs/mustache.min.js',
			'js/libs/zepto.min.js',
			'js/libs/mui.picker.min.js',
			'js/libs/mui.poppicker.js'
		], function() {
			_Z = Zepto;
			initListener();
		});
	};

	/*
	 
	 * @description 初始化监听事件
	 * */
	function initListener() {

		//设置头部点击切换事件
		title.addEventListener('tap', function() {
			headerChange.classList.remove('mui-hidden');
		});

		//切换事件
		headerChange.addEventListener('tap', function() {
			var newTitle = changeTitle.innerText,
				oldTitle = title.innerText;

			title.innerText = newTitle;
			changeTitle.innerText = oldTitle;
			headerChange.classList.add('mui-hidden');
			//切换内容展示
			searchAppoint.classList.contains('mui-hidden') ? searchAppoint.classList.remove('mui-hidden') : searchAppoint.classList.add('mui-hidden');
			appointHandle.classList.contains('mui-hidden') ? appointHandle.classList.remove('mui-hidden') : appointHandle.classList.add('mui-hidden');

		});

		//右上角点击事件
		funChange.addEventListener('tap', function() {

			if(searchChange.classList.contains('searchchangeout')) {
				searchChange.classList.remove('searchchangeout');
			} else {
				searchChange.classList.add('searchchangeout');
			}

		});

		//办理部门点击事件
		doc.getElementById('apartment').addEventListener('tap', function() {
			mask.classList.remove('mui-hidden');
			sideContent.classList.remove('sidecontentout');
		});
		
		//设置右侧区级市级点击事件
		doc.getElementById('district').addEventListener('tap',function(e){
			if(e.target.nodeName.toUpperCase() == 'LI'){
				var chooseText = e.target.innerText;
				mask.classList.add('mui-hidden');
				sideContent.classList.add('sidecontentout');
				doc.getElementById('handleapartment').innerText = chooseText;
			}
		});
		
		doc.getElementById('country').addEventListener('tap',function(e){
			if(e.target.nodeName.toUpperCase() == 'LI'){
				var chooseText = e.target.innerText;
				mask.classList.add('mui-hidden');
				sideContent.classList.add('sidecontentout');
				doc.getElementById('handleapartment').innerText = chooseText;
			}
		});

		//设置mask点击事件
		mask.addEventListener('tap', function() {
			this.classList.add('mui-hidden');
			sideContent.classList.add('sidecontentout');
			sideListContent.classList.add('sidecontentout');
		});
		
		//设置每一个办理点点击事件
		doc.getElementById('handlepoint').addEventListener('tap',function(e){
			if(e.target.nodeName.toUpperCase() == 'LI'){
				var text = e.target.innerHTML;
				//此时需要往打开的办事点李复制，这边用zepto,暂时不用原生
				_Z('#content-option li').each(function(key,value){
					if(!_Z(this).find('.handlearea').hasClass('mui-hidden')){
						_Z(this).find('.choosearea').text(text);
						sideListContent.classList.add('sidecontentout');
						mask.classList.add('mui-hidden');
					}
				})
				
			}
		})

		//设置区级和市级的点击事件
		sideContent.addEventListener('tap', function(e) {
			if(e.target.classList.contains('areachoose')) {
				var choosename = e.target.dataset.name,
					allarea = doc.getElementById('allarea'),
					allarealist = allarea.querySelectorAll('div');
				
				//设置区级市级样式变化
				var areatab = doc.getElementById('areachange'),
					areatabs  = areatab.querySelectorAll('div');
					
				for(var i = 0,j = areatabs.length; i < j;i++){
					areatabs[i].classList.remove('choosed');
				}
				e.target.classList.add('choosed');
				
				//设置内容的切换
				for(var i = 0, j = allarealist.length; i < j; i++) {

					if(allarealist[i].id == choosename) {
						allarealist[i].classList.remove('mui-hidden');
					} else {
						allarealist[i].classList.add('mui-hidden');
					}
				}
			}
		});

		//设置列表的点击事件，包括右侧划出和每一项的显示隐藏
		_Z('#content-option').on('tap', 'li', function() {
			var handleArea = this.querySelector('.handlearea'),
				allHandleArea = doc.querySelectorAll('.handlearea');
			//首先移除其他样式
			for(var i = 0, j = allHandleArea.length; i < j; i++) {
				allHandleArea[i].classList.add('mui-hidden');

			}

			//添加样式
			if(handleArea.classList.contains('mui-hidden')) {
				handleArea.classList.remove('mui-hidden');
			} else {
				handleArea.classList.add('mui-hidden');
			}
		});

		//设置每一项的办理点点击事件
		contentOption.addEventListener('tap', function(e) {
			if(e.target.classList.contains('handlearea') || e.target.parentNode.classList.contains('handlearea')) {
				mask.classList.remove('mui-hidden');
				sideListContent.classList.remove('sidecontentout');
			}
		});

		//按钮点击事件
		btnWrite.addEventListener('tap', function() {
			allmask.classList.remove('mui-hidden');
			adviceTop.classList.remove('advicechooseout');
			adviceBottom.classList.remove('advicechooseout');
		});
		//全部遮罩点击事件
		allMask.addEventListener('tap', function() {
			allmask.classList.add('mui-hidden');
			adviceTop.classList.add('advicechooseout');
			adviceBottom.classList.add('advicechooseout');
		})

		//弹窗效果
		document.getElementById('submit').addEventListener('click', function() {
			//设置旋转，首先先修改圆点样式ß
			doc.getElementById('topline').classList.add('toplinechange');
			doc.getElementById('bottomline').classList.add('bottomlinechange');
			//修改高度
			//adviceTop.classList.add('topchangeheight');
			//adviceBottom.classList.add('bottomchangeheight');
			
			adviceBottom.classList.add('advice_bottom_change');
		});
		//设置旋转结束后的效果，可能存在兼容性问题
		document.getElementById('advice_bottom').addEventListener('animationend', function() {
			this.classList.add('advice_bottom_hidden');
			doc.getElementById('basiccontent').classList.add('mui-hidden');
			doc.getElementById('successcontent').classList.remove('mui-hidden');
		});

		//预约时间点击事件
		doc.getElementById('appointdate').addEventListener('tap', function() {
			var optionsJson = {
				value: "2017-06-20 10:10",
				beginYear: 2010,
				endYear: 2020
			};
			var picker = new mui.DtPicker(optionsJson);
			picker.show(function(rs) {

				console.log('选择的年,月,日,时,分为:' + rs.y.value + '年' + rs.m.value + '月' + rs.d.value + '日' + rs.h.value + '时' + rs.i.value + '分');
				appointdate.innerText = rs.y.value + '/' + rs.m.value + '/' + rs.d.value;
				picker.dispose();
			});
		})

		//预约时间段
		doc.getElementById('appointtime').addEventListener('tap', function() {
			var userPicker = new mui.PopPicker();
			userPicker.setData([{
				value: '上午',
				text: '上午'
			}, {
				value: '下午',
				text: '下午'
			}]);
			userPicker.show(function(items) {
				appointtime.innerText = items[0].value;
				
			});
		});
	}

});