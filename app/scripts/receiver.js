(function()
{
    'use strict';

    var rtc = window.rtc;

    rtc.connect('ws://batman.dev.dailymotion.com:8001');

    rtc.on('get_peers' , function(peers){ console.log('get_peers', peers); });

})();
