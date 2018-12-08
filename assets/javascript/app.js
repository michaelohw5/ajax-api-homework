var buttonDiv = $("#button-div");
var topics = ["cat", "dog", "kangaroo", "trebuchet"];

var topic = "";
var queryURL = "";
var gifArr = [];
var limit = 10;



var renderButtons = function () {
    //empty the buttons-div first
    buttonDiv.empty();
    //create button for all the elements in topics array, append to button-div
    for (var i = 0; i < topics.length; i++) {
        var newBtn = $("<button/>");
        newBtn.text(topics[i]);
        newtopic = topics[i];
        buttonDiv.append(newBtn);
        newBtn.attr({
            "id": "gifButton-" + i,
            "onClick": `loadGif(${newtopic})`,

        });
        $("#buttons").append(newBtn);
    }
}

var loadGif = function (topic) {
    $("#gifs").empty();
    ajaxFunc(topic);
}

var ajaxFunc = function (topic) {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=dc6zaTOxFJmzC&limit=" + limit,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            // var gifObj = response.data[i];
            var gifId = response.data[i].id;
            var gifUrl = response.data[i].images.original.url;
            var gifRating = response.data[i].rating;
            // gifObj.attr({
            //     "id": gifId,
            //     "url": gifUrl,
            //     "rating": gifRating,
            // });
            gifArr.push({
                id: gifId,
                url: gifUrl,
                rating: gifRating,
            });
            console.log(gifArr);
        } 
        appendGif();
    });   
}

var appendGif = function () {
    console.log("Appendgif running");
    for (var i=0; i<gifArr.length; i++) {
        var image = $("<img>");
        image.attr("src", gifArr[i].url);
        $("#gifs").append(image);   
        console.log("yo");
    }
}


renderButtons();
