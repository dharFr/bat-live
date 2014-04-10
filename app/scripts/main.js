
(function()
{
    'use strict';

    // Browser shims
    // var PeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    // var IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
    // var SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
    // navigator.getMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

    var liveClient = {
        container  : document.querySelector('#container'),
        video      : document.querySelector('#sender-video'),
        liveStream : document.querySelector('#receiver-video'),
        startBtn   : document.querySelector('#start-btn'),
        stopBtn    : document.querySelector('#stop-btn'),

        localMediaStream: null,
        pc: null,

        init: function ()
        {
            // Initial state
            this.startBtn.setAttribute('disabled', '');

            this.startBtn.addEventListener('click', this.createPeerConnection.bind(this), false);

            rtc.createStream({video: true, audio:true}, function(localMediaStream){
              // get local stream for manipulation

                this.video.src = window.URL.createObjectURL(localMediaStream);
                this.localMediaStream = localMediaStream;

                this.video.onloadedmetadata = function(e) {
                    // Do something with the video here.
                    console.log('previewing video', e);
                }.bind(this);

            }.bind(this));
            rtc.connect('ws://batman.dev.dailymotion.com:8001');



            rtc.on('ready', function()
            {
                console.log('rtc ready');
            });

            rtc.on('get_peers'            , function(peers){ console.log('get_peers', peers); });
            rtc.on('new_peer_connected'   , function(peerId){
                console.log('new_peer_connected', peerId);
                this.peerId = peerId;
                this.startBtn.removeAttribute('disabled');
            }.bind(this));

            rtc.on('receive_answer'       , function(answer)       { console.log('receive_answer', answer); });
            rtc.on('receive_ice_candidate', function(candidate)    { console.log('receive_ice_candidate', candidate); });
            rtc.on('receive_offer'        , function(offer)        { console.log('receive_offer', offer.sdp, offer.socketId); });
            rtc.on('remove_peer_connected', function()             { console.log('remove_peer_connected', arguments); });
            rtc.on('add remote stream'    , function(remoteStream) {
                console.log('add remote stream', remoteStream);
                this.liveStream.src = window.URL.createObjectURL(remoteStream);
            }.bind(this));

        },
        createPeerConnection: function() {

            var constraints = {
                mandatory: {
                    OfferToReceiveAudio: true,
                    OfferToReceiveVideo: true
                }
            };

            try {
                console.log('sending offer', this.peerId);

                // rtc.createPeerConnection(this.peerId);
                // debugger
                // rtc.sendOffer(this.peerId);

                // this.pc.onicecandidate = onIceCandidate;
                // this.pc.onicecandidate = function(e) { console.log('onicecandidate', e); };

            } catch (e) {
                console.log('Failed to create PeerConnection, exception:', e);
                alert("Cannot create PeerConnection object; WebRTC is not supported by this browser.");
                return;
            }
            // var pcConfig, options, constraints;

            // pcConfig = {
            //     iceServers: [
            //         // {url: 'stun:stun1.l.google.com:19302'},
            //         // {url: 'stun:stun2.l.google.com:19302'},
            //         // {url: 'stun:stun3.l.google.com:19302'},
            //         // {url: 'stun:stun4.l.google.com:19302'},
            //         {url: 'stun:stun.l.google.com:19302'}
            //     ]
            // };
            // options = {
            //     optional: [
            //         {DtlsSrtpKeyAgreement: true},
            //         {RtpDataChannels: true}
            //     ]
            // };
            // constraints = {
            //     mandatory: {
            //         OfferToReceiveAudio: true,
            //         OfferToReceiveVideo: true
            //     }
            // };

            // try {
            //     console.log('creating PeerConnection with', pcConfig, options);

            //     this.pc = new PeerConnection(pcConfig, options);
            //     this.pc.addStream(this.localMediaStream);
            //     this.pc.createOffer(
            //         this.onOfferCreated.bind(this),
            //         function onError(err) { throw err; },
            //         constraints);

            //     // this.pc.onicecandidate = onIceCandidate;
            //     this.pc.onicecandidate = function(e) { console.log('onicecandidate', e); };

            // } catch (e) {
            //     console.log('Failed to create PeerConnection, exception:', e);
            //     alert("Cannot create PeerConnection object; WebRTC is not supported by this browser.");
            //     return;
            // }

            // this.pc.onconnecting   = function() { console.log('onSessionConnecting', arguments); };
            // this.pc.onopen         = function() { console.log('onSessionOpened', arguments); };
            // this.pc.onaddstream    = function() { console.log('onRemoteStreamAdded', arguments); };
            // this.pc.onremovestream = function() { console.log('onRemoteStreamRemoved', arguments); };
            // this.pc.ondatachannel  = function() { console.log('onDataChannel', arguments); };
        }
    };

    liveClient.init();
})();
