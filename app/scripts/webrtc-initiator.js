class webrtcInitiator {
    constructor() {
        super.constructor();

        this.peerConnection = new RTCPeerConnection(this.config,  this.constraints);
        this.dataChannel = this.peerConnection.createDataChannel('opengroup', { reliable:true });

        this.dataChannel.onmessage = function(e){console.log("DC message:" +e.data);};
        this.dataChannel.onopen = function(){console.log("------ DATACHANNEL OPENED ------");};
        this.dataChannel.onclose = function(){console.log("------- DC closed! -------")};
        this.dataChannel.onerror = function(){console.log("DC ERROR!!!")};
    }

    createOffer() {
        var that = this
        this.peerConnection.createOffer(function(offer) {
            that.peerConnection.setLocalDescription(new RTCSessionDescription(offer), function() {
                that.offer = offer
            }, errorCatcher);
        }, errorCatcher);
    }
}

var errorCatcher = function (e) {
    console.log(e)
}