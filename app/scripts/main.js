if (location.hash == '#initiator') {
    var webrtcInitiator = new webrtcInitiator();

    webrtcInitiator.createOffer();

    setTimeout(function () {
        var offerJSON = webrtcInitiator.getOffer();
        var answer = prompt('Please cut the offer and paste the answer', JSON.stringify(offerJSON));
    }, 1000);
}


if (location.hash == '#answerer') {
    var webrtcAnswerer = new webrtcAnswerer();

    var offer = prompt('Please paste the offer', '');
    webrtcAnswerer.createAnswer(offer);
}