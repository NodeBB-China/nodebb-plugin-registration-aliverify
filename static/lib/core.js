"use strict";
//Check Windows Url
$(document).ready(function () {
    $(window).on('action:ajaxify.end', function (event, data) {
        console.log(data);
        console.log(event);
        if (data.url == "register") {
            $("head").append('<link type="text/css" href="//g.alicdn.com/sd/ncpc/nc.css?t=1502432138961" rel="stylesheet"/>');
            //Add Check Body
            $("body").prepend('<div id="_umfp" style="display:inline;width:1px;height:1px;overflow:hidden"></div>');
            var ct = Date.now();
            console.log('nodebb-plugin-aliverify: loaded;');
            console.log("阿里云滑动验证: nc.js  Start loading");
            $.getScript("//g.alicdn.com/sd/ncpc/nc.js?t=1502432138961", function () {
                var cts = Date.now() - ct;
                console.log("阿里云滑动验证: nc.js loaded. 耗时:" + cts + "ms");
                ct = Date.now();
                console.log("阿里云滑动验证: ali.js  Start loading");
                $.getScript("./aliverify/js/register", function (err) {
                    cts = Date.now() - ct;
                    console.log("阿里云滑动验证: ali.js loaded. 耗时:" + cts + "ms");
                });
            });
        }
    });
});

