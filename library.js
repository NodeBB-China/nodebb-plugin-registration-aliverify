"use strict";
const meta = module.parent.require('./meta');
let core = {}, ALY = require("aliyun-sdk"), app_key, app_secret,app_id;
meta.settings.get('aliverify', function (err, settings) {
	if (!err && settings['key'] && settings['secret']) {
		app_key = settings['key'];
		app_secret = settings['secret'];
		app_id = settings['appkey'];
	}
});
//hook static:app.load
core.init = (data, callback) => {
	function renderAdmin(req, res) {
		res.render('admin/plugins/aliverify', {});
	}
	data.router.get('/admin/plugins/aliverify', data.middleware.admin.buildHeader, renderAdmin);
	data.router.get('/api/admin/plugins/aliverify', renderAdmin);
	data.router.get('/aliverify/js/register', (req, res, next) => {
		res.set('Content-Type', 'application/x-javascript');
		res.charset = 'utf-8';
		res.sendFile(__dirname + "/static/lib/register.js");
	});
	
	callback();
};
//hook filter:admin.header.build
core.addAdminNavigation = (custom_header, callback) => {
	custom_header.plugins.push({
		"icon": "fa-tasks",
		"route": "/plugins/aliverify",
		"name": "阿里云验证服务"
	});

	callback(null, custom_header);
};
//hook filter:register.build
core.regcaptcha = (data, callback) => {
	if (!app_key || !app_secret) {
		callback(null, data);
	}
	let ret = {
		"label": "验证码",
		"html": '<div id="nc_captcha"></div>'
	};
	let nc_captcha = {
		"html": "<input type='hidden' id='csessionid' name='csessionid'/><input type='hidden' id='sig' name='sig'/><input type='hidden' id='token' name='alitoken'/><input type='hidden' id='scene' name='scene'/><p class='hidden' id='ali_appkey'>"+app_id+"</p>"
	};


	if (data.templateData.regFormEntry && Array.isArray(data.templateData.regFormEntry)) {
		data.templateData.regFormEntry.push(ret);
		data.templateData.regFormEntry.push(nc_captcha);
	} else {
		data.templateData.captcha = ret;
		data.templateData.nc_captcha = nc_captcha;
	}
	callback(null, data);
};
//hook filter:register.check
core.regcheck = (data, callback) => {
	//console.log("hook filter:register.check");
	if (!app_key || !app_secret) {
		callback(null, data);
	}
	//console.log(data);
	let jaq = new ALY.JAQ({
		accessKeyId: app_key,
		secretAccessKey: app_secret,
		endpoint: 'http://jaq.aliyuncs.com',
		apiVersion: '2016-11-23',
	});

	jaq.afsCheck({
		Platform: 3,//必填参数，请求来源： 1：Android端； 2：iOS端； 3：PC端及其他
		Session: data.req.body['csessionid'],// 必填参数，从前端获取，不可更改
		Sig: data.req.body['sig'],// 必填参数，从前端获取，不可更改
		Token: data.req.body['alitoken'],// 必填参数，从前端获取，不可更改
		Scene: "register"// 必填参数，从前端获取，不可更改
	}, function (err, d) {
		if (err) {
			//异常
			console.log('error:', err);
			callback(err, data)
			return;
		}
		//此处无异常，但也可能调用失败
		console.log('result:', JSON.stringify(d));
		if(d.hasOwnProperty("Data") && d.Data && d.ErrorCode == 0){
			callback(null, data);	
		}else{
			callback({ source: '阿里云验证', message: '验证失败，错误代码:'+d.ErrorCode }, data)
		}
	});
};
module.exports = core;
