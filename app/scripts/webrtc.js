class webrtc {
    constructor() {
        var that = this;

        this.config = {
            'iceServers': [{ 'url': 'stun:23.21.150.121' }]
        };

        this.constraints = {
            'optional': [{
                'DtlsSrtpKeyAgreement': true,
                'RtpDataChannels': true
            }]
        };

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

        try {
            this.dataChannel = this.peerConnection.createDataChannel('opengroup', { reliable: true });
            this.dataChannel.onopen = this.onDataChannelOpen;
            this.dataChannel.onmessage = this.onDataChannelMessage;
            this.dataChannel.onclose = this.onDataChannelClose;
            this.dataChannel.onerror = this.onDataChannelError;
        } catch(e) {
            console.log('No data channel')
        }
    }

    sendMessage(message) {
        this.dataChannel.send(message);
    }

    onConnection() {
        console.info('Datachannel connected');
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