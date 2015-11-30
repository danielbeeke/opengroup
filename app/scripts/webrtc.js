class webrtc {
    constructor() {
        this.config = {
            'iceServers': [{ 'url': 'stun:23.21.150.121' }]
        };

        this.constraints = {"optional":[{"DtlsSrtpKeyAgreement":true},{"RtpDataChannels":true}],"mandatory":{}};

        this.sdpConstraints = {
            'mandatory': {
                'OfferToReceiveAudio': false,
                'OfferToReceiveVideo': false
            }
        };

        this.peerConnection = new RTCPeerConnection(this.config,  this.constraints);

        this.peerConnection.onsignalingstatechange = this.onSignalingStateChange;
        this.peerConnection.oniceconnectionstatechange = this.onIceConnectionStateChange;
        this.peerConnection.onicegatheringstatechange = this.onIceGatheringStateChange;
        this.peerConnection.onconnection = this.onConnection;
    }

    sendMessage(message) {
        this.dataChannel.send(message);
    }

    onConnection(e) {
        console.info('Datachannel connected', e);
    }

    onSignalingStateChange(state) {
        console.info('signaling state change:', state);
    }

    onIceConnectionStateChange(state) {
        console.info('ice connection state change:', state);
    }

    onIceGatheringStateChange(state) {
        console.info('ice gathering state change:', state);
    }

    onDataChannelOpen(e) {
        console.log('data channel connect');
    }

    onDataChannelMessage(e) {
        console.log('message');

        if (e.data.charCodeAt(0) == 2) {
            // The first message we get from Firefox (but not Chrome)
            // is literal ASCII 2 and I don't understand why -- if we
            // leave it in, JSON.parse() will barf.
            return;
        }

        console.log('message:', e.data);
    }

    onDataChannelClose(e) {
        console.log('data channel close', e);
    }

    onDataChannelError(e) {
        console.log('data channel error', e);
    }
}

window.errorCatcher = function (e) {
    console.log('error:', e)
}