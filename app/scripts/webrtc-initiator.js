class webrtcInitiator extends webrtc {
    constructor() {
        super();
    }

    createOffer() {
        var that = this;

        this.peerConnection.createOffer(function(offer) {
            that.peerConnection.setLocalDescription(offer, function () {}, function () {});
            that.offer = offer;
            that.onOfferCreated(offer);
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