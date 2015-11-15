class webrtcAnswerer extends webrtc {
    constructor() {
        super();

        this.peerConnection = new RTCPeerConnection(this.config,  this.constraints);
        this.dataChannel = this.peerConnection.createDataChannel('opengroup', { reliable:true });

        this.dataChannel.onmessage = function(e){console.log("DC message:" +e.data);};
        this.dataChannel.onopen = function(){console.log("------ DATACHANNEL OPENED ------");};
        this.dataChannel.onclose = function(){console.log("------- DC closed! -------")};
        this.dataChannel.onerror = function(){console.log("DC ERROR!!!")};
    }

    createAnswer(offer) {
        var that = this
    }
}

var errorCatcher = function (e) {
    console.log(e)
}