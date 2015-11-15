if (location.hash == '#initiator') {
    var webrtcInitiator = new webrtcInitiator();

    webrtcInitiator.createOffer();

    webrtcInitiator.onOfferCreated = function (offerJSON)  {
        var answer = prompt('Please cut the offer and paste the answer', JSON.stringify(offerJSON));
    }
}


if (location.hash == '#answerer') {
    var webrtcAnswerer = new webrtcAnswerer();

    var offer = prompt('Please paste the offer', '');
    webrtcAnswerer.createAnswer(offer);

    webrtcAnswerer.onAnswerCreated = function (answerJSON)  {
        alert(JSON.stringify(answerJSON))
    }
}