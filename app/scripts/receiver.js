
(function()
{
    'use strict';

    var rId;
    rId = (localStorage && localStorage.rId) ? localStorage.rId : 'batlive-receiver';

    // var peer = new Peer('someid', {host: 'batman.dev.dailymotion.com', port: 9000, path: '/batlive'});
    console.log('Starting Peer connection with', rId);
    var peer = new Peer(rId, {key: '8c1pbcrq7lihehfr', debug: 3});
    console.log('peer:', peer);


    peer.on('open', function(id) {
        console.log('My peer ID is: ' + id);
        // var conn = peer.connect('batlive-sender');
        peer.on('call', function(call) {
            // Answer the call, providing our mediaStream
            call.answer(null);
            console.log('batman calling ^^', call );
            call.on('stream', function(remoteStream) {

                console.log('receiving video stream ^^', remoteStream );
                var video = document.querySelector('#video');
                video.src = window.URL.createObjectURL(remoteStream);

            });
        });
    });

    // peer.on('connection', function(conn) {
    //     // ...
    //     console.log('Connected...', conn);
    // });

})();
