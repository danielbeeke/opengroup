class webrtc {
    constructor() {
        this.config = {
            'iceServers': [{ 'url': 'stun:23.21.150.121' }]
        };

        this.constraints = {
            'optional': [{ 'DtlsSrtpKeyAgreement': true }]
        };
    }
}
