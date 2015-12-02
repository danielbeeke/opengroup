class webrtcInitiator extends webrtc {
    constructor() {
        super();
        var that = this;

        this.dataChannel = this.peerConnection.createDataChannel('opengroup', {});
        this.dataChannel.onopen = this.onDataChannelOpen;
        this.dataChannel.onmessage = this.onDataChannelMessage;
        this.dataChannel.onclose = this.onDataChannelClose;
        this.dataChannel.onerror = this.onDataChannelError;

        that.peerConnection.createOffer()
        .then(offer => that.peerConnection.setLocalDescription(offer))
        .then(function () {
            var answerJSON = that.offerToAnswerCallback(that.peerConnection.localDescription)
            var answer = new RTCSessionDescription(JSON.parse(answerJSON));
            that.peerConnection.setRemoteDescription(answer);
        })
    }
}