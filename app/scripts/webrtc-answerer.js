class webrtcAnswerer extends webrtc {
    constructor() {
        super();
    }

    createAnswer(offerJSON) {
        var that = this;
        var offer = new RTCSessionDescription(JSON.parse(offerJSON));

        this.peerConnection.setRemoteDescription(offer);

        this.peerConnection.createAnswer(function (answer) {
            that.peerConnection.setLocalDescription(answer);
        }, errorCatcher);

    }
}