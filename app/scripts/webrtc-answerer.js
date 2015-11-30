class webrtcAnswerer extends webrtc {
    constructor() {
        super();
        var that = this;

        this.peerConnection.ondatachannel = function (event) {
            that.receiveChannelCallback(event)
        };

        this.peerConnection.onicecandidate = function (e) {
            if (e.candidate == null) {
                that.onAnswerCreated(that.peerConnection.localDescription)
            }
        };
    }

    receiveChannelCallback(event) {
        this.dataChannel = event.channel;
        this.dataChannel.onmessage = this.onDataChannelMessage;
        this.dataChannel.onopen = this.onDataChannelOpen;
        this.dataChannel.onclose = this.onDataChannelClose;
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