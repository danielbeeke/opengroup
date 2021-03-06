class webrtc {
    constructor() {
        this.config = {
            'iceServers': [{ 'url': 'stun:23.21.150.121' }]
        };

        this.peerConnection = new RTCPeerConnection(this.config,  this.constraints);
    }

    sendMessage(message) {
        if (this.dataChannel) {
            this.dataChannel.send(message);
        }
    }

    onDataChannelOpen(e) {
        console.info('Datachannel connected', e);
    }

    onDataChannelMessage(e) {
        console.info('message:', e.data);

        if (e.data.charCodeAt(0) == 2) {
            // The first message we get from Firefox (but not Chrome)
            // is literal ASCII 2 and I don't understand why -- if we
            // leave it in, JSON.parse() will barf.
            return;
        }
    }

    onDataChannelClose(e) {
        console.log('data channel close', e);
    }

}

window.errorCatcher = function (e) {
    console.log('error:', e)
}