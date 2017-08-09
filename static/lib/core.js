"use strict";
//Check Windows Url
$(document).ready(function () {
    $(window).on('action:ajaxify.end', function (event, data) {
        if (data.url == "register") {
            let ts = Date.now().toString();
            $("head").append('<link type="text/css" href="//g.alicdn.com/sd/ncpc/nc.css?t=' + ts + '" rel="stylesheet"/>');
            //Add Check Body
            $("body").prepend('<div id="_umfp" style="display:inline;width:1px;height:1px;overflow:hidden"></div>');
            let ctaaa = Date.now();
            console.log('nodebb-plugin-aliverify: loaded;');
            console.log("阿里云验证码: nc.js  Start loading");
            $.getScript("//g.alicdn.com/sd/ncpc/nc.js?t=" + ts, function () {
                let ctas = Date.now() - ctaaa;
                console.log("阿里云验证码: nc.js loaded. 耗时:" + ctas + "ms");
                ctaaa = Date.now();
                console.log("阿里云验证码: ali.js  Start loading");
                $.getScript("./aliverify/js/register", function (err) {
                    ctas = Date.now() - ctaaa;
                    console.log("阿里云验证码: ali.js loaded. 耗时:" + ctas + "ms");
                });
            });
            
        }
    });
});

