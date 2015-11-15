if (window.location.hash == '#initiator') {
    var webrtcInitiator = new webrtcInitiator();

    webrtcInitiator.createOffer();

    setTimeout(function () {
        var offerJSON = webrtcInitiator.offer.toJSON();
        var answer = prompt('Please cut the offer and paste the answer', JSON.stringify(offerJSON));
    }, 1000);
}


if (window.location.hash == '#answerer') {
    var webrtcAnswerer = new webrtcAnswerer();

    var offer = prompt('Please paste the offer', '');
    webrtcAnswerer.createAnswer(offer);
}