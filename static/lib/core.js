//Check Windows Url
$(()=>{
    if(document.URL.match("/register")){
        let ts = Date.now().toString();
        //Add Aliyun Check Head
        $("head").append("<!-- 此段必须要引入 t为小时级别的时间戳 -->");
        $("head").append('<link type="text/css" href="//g.alicdn.com/sd/ncpc/nc.css?t='+ts+'" rel="stylesheet"/>');
        $("head").append('<script type="text/javascript" src="//g.alicdn.com/sd/ncpc/nc.js?t='+ts+'"></script>');
        $("head").append("<!-- 引入结束 丧心病狂的NodeBB，他要我通过js加 = = qnmd -->");
        //Add Check Body
        $("body").prepend('<div id="_umfp" style="display:inline;width:1px;height:1px;overflow:hidden"></div>');
        $("body").append(`<script>var nc = new noCaptcha();var nc_appkey = $("#nc_appkey").text();var nc_scene = 'register';var nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');var nc_option = {renderTo: '#nc_captcha',appkey: nc_appkey,scene: nc_scene,token: nc_token,callback: function (data) {console.log(data.csessionid);console.log(data.sig);console.log(nc_token);document.getElementById('csessionid').value = data.csessionid;document.getElementById('sig').value = data.sig;document.getElementById('token').value = nc_token;document.getElementById('scene').value = nc_scene;}};nc.init(nc_option);</script>`);
    }
});
