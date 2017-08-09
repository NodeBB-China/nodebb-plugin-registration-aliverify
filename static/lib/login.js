$(document).ready(function () {
    var nc = new noCaptcha();
    var nc_appkey = $('#nc_appkey').text();
    var nc_scene = 'login'; var nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
    var nc_option = {
        renderTo: '#nc_captcha', appkey: nc_appkey, scene: nc_scene, token: nc_token, callback: function (data) {
            console.log(data.csessionid);
            console.log(data.sig);
            console.log(nc_token);
            document.getElementById('csessionid').value = data.csessionid;
            document.getElementById('sig').value = data.sig;
            document.getElementById('token').value = nc_token;
            document.getElementById('scene').value = nc_scene;
        }
    };
    nc.init(nc_option);
});