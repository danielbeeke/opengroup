if (location.hash == '#initiator') {
    var webrtcInitiator = new webrtcInitiator();

    webrtcInitiator.createOffer();

    webrtcInitiator.onOfferCreated = function (offerJSON)  {
        var answerJSON = prompt('Please cut the offer and paste the answer', JSON.stringify(offerJSON));
        webrtcInitiator.setAnswer(answerJSON)
    };

    window.opengroupClient = webrtcInitiator
}


if (location.hash == '#answerer') {
    var webrtcAnswerer = new webrtcAnswerer();

    var offer = prompt('Please paste the offer', '');
    webrtcAnswerer.createAnswer(offer);

    webrtcAnswerer.onAnswerCreated = function (answerJSON)  {
        prompt('', JSON.stringify(answerJSON))
    };

    window.opengroupClient = webrtcAnswerer
}