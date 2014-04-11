
(function()
{
    'use strict';

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);


    // var senderVideo = document.getElementById('sender-video');
    var previewBtn = document.getElementById('preview-btn');
    previewBtn.addEventListener('click', function()
    {
        // has flash
        if (swfobject.hasFlashPlayerVersion("10.0.0"))
        {
            var serverURL = "rtmp://publish2.dailymotion.com/publish-dm";
            var streamName = "x146etc?auth=1712051963_f1ab3f7113491fd52827093a7d3f1a49";

            var flashvars =
            {
                serverURL : serverURL,
                streamName : streamName
            }
            var params =
            {
                allowScriptAccess:"always",
                wmode:"direct",
                allowfullscreen:"true",
                quality:"high",
                bgcolor:"#ffffff"
            }
            var attributes = {};
            swfobject.embedSWF("flash/Batlive.swf", "video-container", "640", "360", "10.0.0", null, flashvars, params, attributes);

            $(".hero-unit").append('<p>Allow access and watch your live <a href="http://www.dailymotion.com/video/'+streamName.split("?")[0]+'" target="_blank">here</a></p>');
            $( "#preview-btn" ).hide();
        }
        else
        {
            navigator.getMedia (

            // constraints
            {
                video: true,
                audio: true
            },

            // successCallback
            function(localMediaStream) {
                var video = document.querySelector('#sender-video');
                video.src = window.URL.createObjectURL(localMediaStream);
                video.onloadedmetadata = function(e) {
                    // Do something with the video here.
                    console.log('previewing video', e);
                    video.play();
                };
            },

            // errorCallback
            function(err) {
                console.log('The following error occured:', err);
            }

        );
        }
    }, false);
})();
