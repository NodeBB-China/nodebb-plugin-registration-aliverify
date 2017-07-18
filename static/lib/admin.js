define('admin/plugins/aliverify', ['settings'], function(Settings) {
	'use strict';
	/* globals $, app, socket, require */

	var ACP = {};

	ACP.init = function() {
		Settings.load('aliverify', $('.aliverify-settings'));

		$('#save').on('click', function() {
			Settings.save('aliverify', $('.aliverify-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'aliverify-saved',
					title: '配置已保存',
					message: '请重载NodeBB以便使插件生效。',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});
	};

	return ACP;
});