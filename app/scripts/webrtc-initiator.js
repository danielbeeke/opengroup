class webrtcInitiator extends webrtc {
    constructor() {
        super();
    }

    createOffer() {
        var that = this;

        this.peerConnection.createOffer(function(offer) {
            that.peerConnection.setLocalDescription(new RTCSessionDescription(offer), function() {
                that.offer = offer
            }, errorCatcher);
        }, errorCatcher, that.sdpConstraints);
    }

    getOffer() {
        if (this.offer) {
            return this.offer.toJSON()
        }
    }
}
