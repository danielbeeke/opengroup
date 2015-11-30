class webrtcInitiator extends webrtc {
    constructor() {
        super();
        var that = this;

        try {
            this.dataChannel = this.peerConnection.createDataChannel('opengroup', {});
            this.dataChannel.onopen = this.onDataChannelOpen;
            this.dataChannel.onmessage = this.onDataChannelMessage;
            this.dataChannel.onclose = this.onDataChannelClose;
            this.dataChannel.onerror = this.onDataChannelError;
        } catch(e) {
            console.log('No data channel')
        }

        this.peerConnection.onicecandidate = function (e) {
            if (e.candidate == null) {
                that.onOfferCreated(that.peerConnection.localDescription)
            }
        };
    }

    createOffer() {
        var that = this;

        this.peerConnection.createOffer(function(offer) {
            that.peerConnection.setLocalDescription(offer, function () {}, function () {});
        }, errorCatcher, that.sdpConstraints);
    }

    getOffer() {
        if (this.offer) {
            return this.offer.toJSON()
        }
    }

    setAnswer(answerJSON) {
        var answer = new RTCSessionDescription(JSON.parse(answerJSON));
        this.peerConnection.setRemoteDescription(answer);
    }
}