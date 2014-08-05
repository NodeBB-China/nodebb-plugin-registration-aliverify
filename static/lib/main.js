"use strict";


$(function() {
	$(window).on('action:ajaxify.end', function(e, data) {
		if (data.url === 'register' && utils.param('error') === 'wrong-answer') {
			app.alertError('You have answered the registration question incorrectly - please try again.');
		}
	});
});