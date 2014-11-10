"use strict";

var plugin = {},
	meta = module.parent.require('./meta');

plugin.init = function(params, callback) {
	var app = params.app,
		middleware = params.middleware,
		controllers = params.controllers;
		
	app.get('/admin/registration-question', middleware.admin.buildHeader, renderAdmin);
	app.get('/api/admin/registration-question', renderAdmin);

	callback();
};

plugin.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/registration-question',
		icon: 'fa-tint',
		name: 'registration-question'
	});

	callback(null, header);
};

plugin.addCaptcha = function(req, res, templateData, callback) {
	var question = meta.config['registration-question:question'];

	var captcha = {
		label: 'Registration Question',
		html: '<div class="well"><strong>' + question + '</strong><br /><input class="form-control" name="registration-question" id="registration-question" /></div>'
	};

	if (templateData.regFormEntry && Array.isArray(templateData.regFormEntry)) {
		templateData.regFormEntry.push(captcha);
	} else {
		templateData.captcha = captcha;
	}

	callback(null, req, res, templateData);
};

plugin.checkRegister = function(req, res, userData, callback) {
	var answer = meta.config['registration-question:answer'];

	if (answer !== req.body['registration-question']) {
		callback({source: 'registration-question', message: 'wrong-answer'}, req, res, userData);
	} else {
		callback(null, req, res, userData);
	}
};

function renderAdmin(req, res, next) {
	res.render('admin/registration-question', {});
}

module.exports = plugin;