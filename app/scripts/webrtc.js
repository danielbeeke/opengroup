class webrtc {
    constructor() {
        this.config = {
            'iceServers': [{ 'url': 'stun:23.21.150.121' }]
        };

        this.constraints = {
            'optional': [{ 'DtlsSrtpKeyAgreement': true }]
        };

        this.sdpConstraints = {
            'mandatory': {
                'OfferToReceiveAudio': false,
                'OfferToReceiveVideo': false
            }
        };

        this.peerConnection = new RTCPeerConnection(this.config,  this.constraints);
        this.dataChannel = this.peerConnection.createDataChannel('opengroup', { reliable:true });

        this.dataChannel.onmessage = function(e){console.log("DC message:" +e.data);};
        this.dataChannel.onopen = function(){console.log("------ DATACHANNEL OPENED ------");};
        this.dataChannel.onclose = function(){console.log("------- DC closed! -------")};
        this.dataChannel.onerror = function(){console.log("DC ERROR!!!")};
    }
}
