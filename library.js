"use strict";
let meta = module.parent.require('./meta');

let core = {};
let constants = Object.freeze({
        'name': "aliverify",
        'admin': {
            'icon': 'fa-tasks',
            'route': '/plugins/aliverify'
        }
});
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
	callback(null,data);
};
//hook filter:register.check
core.check = (data, callback) => {
	console.log(`hook filter:register.check`);
	console.log(data);
	callback(null,data);
};
//hook filter:filter:meta.getLinkTags
core.addhead = (data,callback) => {
	console.log(`hook filter:filter:meta.getLinkTags`);
	console.log(data);
	callback(null,data);
};
//hook filter:header.build
core.addheader = (data,callback) => {
	console.log(`hook filter:header.build`);
	console.log(data);
	callback(null,data);
};


module.exports = core;
