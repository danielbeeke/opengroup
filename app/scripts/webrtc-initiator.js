class webrtcInitiator extends webrtc {
    constructor() {
        super();
    }

    createOffer() {
        var that = this;

        this.peerConnection.createOffer(function(offer) {
            that.offer = offer;
            that.onOfferCreated(offer)

            that.peerConnection.setLocalDescription(offer, function () {}, function () {});
        }, errorCatcher, that.sdpConstraints);
    }

    getOffer() {
        if (this.offer) {
            return this.offer.toJSON()
        }
    }
}
