$(document).ready(function () {
    var nc = new noCaptcha();
    var nc_appkey = 'FFFF00000000016A37ED';
    var nc_scene = 'register'; var nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
    var nc_option = {
        renderTo: '#nc_captcha', appkey: nc_appkey, scene: nc_scene, token: nc_token, callback: function (data) {
            document.getElementById('csessionid').value = data.csessionid;
            document.getElementById('sig').value = data.sig;
            document.getElementById('token').value = nc_token;
            document.getElementById('scene').value = nc_scene;
            $('.nc-container .nc_scale span').css({width:'48px'});
            $('#nc_1_n1z').css({left: ( $('#nc_captcha').width() - 48).toString() + 'px'});
            $('#nc_1__bg').css({width: ( $('#nc_captcha').width() - 48).toString() + 'px'});
        }
    };
    nc.init(nc_option);
});
