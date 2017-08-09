"use strict";
//Check Windows Url
$(document).ready(function () {
    $(window).on('action:ajaxify.end', function (event, data) {
        if (data.url == "register") {
            var ts = Date.now().toString();
            $("head").append('<link type="text/css" href="//g.alicdn.com/sd/ncpc/nc.css?t=' + ts + '" rel="stylesheet"/>');
            //Add Check Body
            $("body").prepend('<div id="_umfp" style="display:inline;width:1px;height:1px;overflow:hidden"></div>');
            var ct = Date.now();
            console.log('nodebb-plugin-aliverify: loaded;');
            console.log("阿里云验证码: nc.js  Start loading");
            $.getScript("//g.alicdn.com/sd/ncpc/nc.js?t=" + ts, function () {
                var cts = Date.now() - ct;
                console.log("阿里云验证码: nc.js loaded. 耗时:" + cts + "ms");
                ctaaa = Date.now();
                console.log("阿里云验证码: ali.js  Start loading");
                $.getScript("./aliverify/js/register", function (err) {
                    cts = Date.now() - ct;
                    console.log("阿里云验证码: ali.js loaded. 耗时:" + cts + "ms");
                });
            });
        }
    });
});

