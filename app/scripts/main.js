
(function()
{
    'use strict';


    var sId, rId;
    if (localStorage && localStorage.sId && localStorage.rId)
    {
        sId = localStorage.sId;
        rId = localStorage.rId;
    }
    else
    {
        sId = UUIDjs.create();
        rId = UUIDjs.create();
        localStorage.setItem('sId', sId);
        localStorage.setItem('rId', rId);
    }

    document.querySelector('a#receiverLink').href += '?rid='+rId;

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);


    // var senderVideo = document.getElementById('sender-video');
    var previewBtn = document.getElementById('preview-btn');
    previewBtn.addEventListener('click', goLive, false);

    function goLive()
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
                startStreaming(localMediaStream);
                // video.onloadedmetadata = function(e) {
                //     // Do something with the video here.
                //     console.log('previewing video', e);
                // };
            },

            // errorCallback
            function(err) {
                console.log('The following error occured:', err);
            }
        );

    }

    function startStreaming(localMediaStream) {

        console.log('Starting Peer connection with', sId);
        // var peer = new Peer('someid', {host: 'batman.dev.dailymotion.com', port: 9000, path: '/batlive'});
        var peer = new Peer(sId, {key: '8c1pbcrq7lihehfr', debug: 3});
        console.log('peer:', peer);

        peer.on('open', function(id) {
            console.log('My peer ID is: ' + id);

            // Call a peer, providing our mediaStream
            var call = peer.call(rId, localMediaStream);
        });
    }

})();
