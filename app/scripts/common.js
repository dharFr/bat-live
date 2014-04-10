(function() {
    'use strict';
    var rtc = {};
    // Fallbacks for vendor-specific variables until the spec is finalized.
    rtc.PeerConnection = (window.PeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection || window.mozRTCPeerConnection);
    rtc.URL = (window.URL || window.webkitURL || window.msURL || window.oURL);
    rtc.nativeRTCIceCandidate = (window.mozRTCIceCandidate || window.RTCIceCandidate);
    rtc.nativeRTCSessionDescription = (window.mozRTCSessionDescription || window.RTCSessionDescription); // order is very important: 'RTCSessionDescription' defined in Nighly but useless
    navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);


    if (navigator.webkitGetUserMedia) {
        if (!webkitMediaStream.prototype.getVideoTracks) {
            webkitMediaStream.prototype.getVideoTracks = function() {
                return this.videoTracks;
            };
            webkitMediaStream.prototype.getAudioTracks = function() {
                return this.audioTracks;
            };
        }

        // New syntax of getXXXStreams method in M26.
        if (!webkitRTCPeerConnection.prototype.getLocalStreams) {
            webkitRTCPeerConnection.prototype.getLocalStreams = function() {
                return this.localStreams;
            };
            webkitRTCPeerConnection.prototype.getRemoteStreams = function() {
                return this.remoteStreams;
            };
        }
    }

    // Toggle debug mode (console.log)
    rtc.debug = false;

    // Holds a connection to the server.
    rtc._socket = null;

    // Holds identity for the client.
    rtc._me = null;

    // Holds callbacks for certain events.
    rtc._events = {};

    rtc.on = function(eventName, callback) {
        rtc._events[eventName] = rtc._events[eventName] || [];
        rtc._events[eventName].push(callback);
    };

    rtc.fire = function(eventName, _) {
        var events = rtc._events[eventName];
        var args = Array.prototype.slice.call(arguments, 1);

        if (!events) {
            return;
        }

        for (var i = 0, len = events.length; i < len; i++) {
            events[i].apply(null, args);
        }
    };

    // Holds the STUN/ICE server to use for PeerConnections.
    rtc.SERVER = function() {
        if (navigator.mozGetUserMedia) {
            return {
                'iceServers': [{
                    'url': 'stun:23.21.150.121'
                }]
            };
        }
        return {
            'iceServers': [{
                'url': 'stun:stun.l.google.com:19302'
            }]
        };
    };

    /**
     * Connects to the websocket server.
     */
    rtc.connect = function(server, room) {
        console.log('Connecting to:', server);
        room = room || ''; // by default, join a room called the blank string
        rtc._socket = new WebSocket(server);

        rtc._socket.onopen = function() {

            rtc._socket.send(JSON.stringify({
                eventName: 'join_room',
                data: {
                    'room': room
                }
            }));

            rtc._socket.onmessage = function(msg) {
                var json = JSON.parse(msg.data);
                rtc.fire(json.eventName, json.data);
            };

            rtc._socket.onerror = function(err) {
                console.error('onerror');
                console.error(err);
            };

            rtc._socket.onclose = function(data) {
                var id = rtc._socket.id;
                rtc.fire('disconnect stream', id);
                if (typeof(rtc.peerConnections[id]) !== 'undefined')
                    rtc.peerConnections[id].close();
                delete rtc.peerConnections[id];
                delete rtc.dataChannels[id];
                delete rtc.connections[id];
            };

            rtc.on('get_peers', function(data) {
                rtc.connections = data.connections;
                rtc._me = data.you;
            });

            rtc.on('receive_ice_candidate', function(data) {
                var candidate = new nativeRTCIceCandidate(data);
                rtc.peerConnections[data.socketId].addIceCandidate(candidate);
                rtc.fire('receive ice candidate', candidate);
            });

            rtc.on('new_peer_connected', function(data) {
                var id = data.socketId;
                rtc.connections.push(id);
                delete rtc.offerSent;

                var pc = rtc.createPeerConnection(id);
                for (var i = 0; i < rtc.streams.length; i++) {
                    var stream = rtc.streams[i];
                    pc.addStream(stream);
                }
            });

            rtc.on('remove_peer_connected', function(data) {
                var id = data.socketId;
                rtc.fire('disconnect stream', id);
                if (typeof(rtc.peerConnections[id]) !== 'undefined')
                    rtc.peerConnections[id].close();
                delete rtc.peerConnections[id];
                delete rtc.dataChannels[id];
                delete rtc.connections[id];
            });

            rtc.on('receive_offer', function(data) {
                rtc.receiveOffer(data.socketId, data.sdp);
                rtc.fire('receive offer', data);
            });

            rtc.on('receive_answer', function(data) {
                rtc.receiveAnswer(data.socketId, data.sdp);
                rtc.fire('receive answer', data);
            });

            rtc.fire('connect');
        };
    };

    window.rtc = rtc;
})();
