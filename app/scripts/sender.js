
(function()
{
    'use strict';

    var rtc = window.rtc;

    var sdpConstraints = {
      'mandatory': {
        'OfferToReceiveAudio': true,
        'OfferToReceiveVideo': true
      }
    };

    var LiveSender = {
        video     : document.querySelector('#video'),
        goliveBtn : document.querySelector('#golive-btn'),

        init: function()
        {
            this.goliveBtn.setAttribute('disabled', '');

            navigator.getMedia(
                // constraints
                { video: true, audio: true },

                // successCallback
                function(localMediaStream) {
                    this.video.src = rtc.URL.createObjectURL(localMediaStream);
                    this.video.onloadedmetadata = function(e)
                    {
                        // Do something with the video here.
                        console.log('previewing video', e);
                        this.goliveBtn.removeAttribute('disabled')
                        this.goliveBtn.addEventListener('click', this.connectWithBatman.bind(this), false);

                    }.bind(this);
                }.bind(this),
                // errorCallback
                function(err) {
                    console.log('The following error occured:', err);
                }
            );
        },

        connectWithBatman: function()
        {
            rtc.connect('ws://batman.dev.dailymotion.com:8001');
            rtc.on('get_peers'          , this.onGetPeers.bind(this));
            rtc.on('new_peer_connected' , this.onNewPeerConnected.bond(this));
        },

        onGetPeers: function(peers)
        {
            console.log('get_peers', peers);
            this.setCurrentPeer(peers.connections[0]);
        },

        onNewPeerConnected: function(peerId)
        {
            console.log('new_peer_connected', peerId);
            this.setCurrentPeer(peerId);
        },

        setCurrentPeer: function(peerId)
        {
            console.log('Defining current peer:', peerId);
            this.peerId = peerId;
        }
    };
    LiveSender.init();



})();
