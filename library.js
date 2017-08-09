"use strict";
const meta = module.parent.require('./meta');
let core = {};
const constants = Object.freeze({
	'name': "aliverify",
	'admin': {
		'icon': 'fa-tasks',
		'route': '/plugins/aliverify'
	}
});
const ALY = require("aliyun-sdk");
const app_key = meta.config['aliverify:key'];
const app_secret = meta.config['aliverify:secret'];
//hook static:app.load
core.init = (data, callback) => {
	function renderAdmin(req, res) {
		res.render('admin/plugins/aliverify', {});
	}
	data.router.get('/admin/plugins/aliverify', data.middleware.admin.buildHeader, renderAdmin);
	data.router.get('/api/admin/plugins/aliverify', renderAdmin);
	callback();
};
//hook filter:admin.header.build
core.addAdminNavigation = (custom_header, callback) => {
	custom_header.plugins.push({
		"route": constants.admin.route,
		"icon": constants.admin.icon,
		"name": "阿里云验证服务"
	});

	callback(null, custom_header);
};
//hook filter:register.build
core.addverify = (data, callback) => {
	console.log(`hook filter:register.build`);
	console.log(data);
	let ret = {
		"label": "验证码",
		"html": '<div class="well"><div id="nc_captcha"></div></div>'
	};
	let ali_key = app_key;
	let nc_captcha = {
		"html": "<p id='nc_appkey' class='hidden'>" + ali_key + "</p><input type='hidden' id='csessionid' name='csessionid'/><input type='hidden' id='sig' name='sig'/><input type='hidden' id='token' name='token'/><input type='hidden' id='scene' name='scene'/>"
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
core.check = (data, callback) => {
	console.log(`hook filter:register.check`);
	console.log(data);

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
		Token: data.req.body['token'],// 必填参数，从前端获取，不可更改
		Scene: "register"// 必填参数，从前端获取，不可更改

	}, function (err, d) {
		if (err) {
			//异常
			console.log('error:', err);
			callback(err,data)
			return;
		}
		//此处无异常，但也可能调用失败
		console.log('result:', JSON.stringify(d));
	});

	callback(null, data);
};


module.exports = core;
