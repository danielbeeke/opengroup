if (location.hash == '#initiator') {
    window.opengroupClient = new webrtcInitiator();

    // Here we have a function that get's called when the offer is created,
    // the function returns the answer to the class.
    opengroupClient.offerToAnswerCallback = function (offer)  {
        return prompt('Please cut the offer and paste the answer', JSON.stringify(offer));
    };
}


if (location.hash == '#answerer') {
    window.opengroupClient = new webrtcAnswerer();

    var offer = prompt('Please paste the offer', '');
    opengroupClient.createAnswer(offer);

    opengroupClient.onAnswerCreated = function (answerJSON)  {
        prompt('', JSON.stringify(answerJSON))
    };
}