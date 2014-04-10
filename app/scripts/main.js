
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
    }, false);
})();
