"use strict";
//Check Windows Url
$(document).ready(function () {
    if (Array.isArray(document.URL.match("/register"))) {
        var ts = Date.now().toString();
        //Add Aliyun Check Head
        $("head").append("<!-- 此段必须要引入 t为小时级别的时间戳 -->");
        $("head").append('<link type="text/css" href="//g.alicdn.com/sd/ncpc/nc.css?t=' + ts + '" rel="stylesheet"/>');
        $.getScript("//g.alicdn.com/sd/ncpc/nc.js?t='+ts+'", function () {
            console.log("阿里云验证码: nc.js loaded.");
            $.getScript("./aliverify/js/register", function () {
                console.log("阿里云验证码: ali.js loaded.");
            });
        });
        $("head").append('<script type="text/javascript" src="//g.alicdn.com/sd/ncpc/nc.js?t=' + ts + '"></script>');
        $("head").append("<!-- 引入结束 丧心病狂的NodeBB，他要我通过js加 = = qnmd -->");
        //Add Check Body
        $("body").prepend('<div id="_umfp" style="display:inline;width:1px;height:1px;overflow:hidden"></div>');
        console.log('nodebb-plugin-aliverify: loaded;');
    } else if (Array.isArray(document.URL.match("/login"))) {
        var ts = Date.now().toString();
        //Add Aliyun Check Head
        $("head").append("<!-- 此段必须要引入 t为小时级别的时间戳 -->");
        $("head").append('<link type="text/css" href="//g.alicdn.com/sd/ncpc/nc.css?t=' + ts + '" rel="stylesheet"/>');
        $.getScript("//g.alicdn.com/sd/ncpc/nc.js?t='+ts+'", function () {
            console.log("阿里云验证码: nc.js loaded.");
            $.getScript("./aliverify/js/login", function () {
                console.log("阿里云验证码: ali.js loaded.");
            });
        });
        $("head").append('<script type="text/javascript" src="//g.alicdn.com/sd/ncpc/nc.js?t=' + ts + '"></script>');
        $("head").append("<!-- 引入结束 丧心病狂的NodeBB，他要我通过js加 = = qnmd -->");
        //Add Check Body
        $("body").prepend('<div id="_umfp" style="display:inline;width:1px;height:1px;overflow:hidden"></div>');
        console.log('nodebb-plugin-aliverify: loaded;');
    }
});

