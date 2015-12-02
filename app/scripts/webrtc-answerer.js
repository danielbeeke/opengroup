class webrtcAnswerer extends webrtc {
    constructor() {
        super();
        var that = this;

        this.peerConnection.ondatachannel = function (event) {
            that.dataChannel = event.channel;
            that.dataChannel.onmessage = that.onDataChannelMessage;
            that.dataChannel.onopen = that.onDataChannelOpen;
            that.dataChannel.onclose = that.onDataChannelClose;
        };

        this.peerConnection.onicecandidate = function (e) {
            if (e.candidate == null) {
                that.onAnswerCreated(that.peerConnection.localDescription)
            }
        };
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