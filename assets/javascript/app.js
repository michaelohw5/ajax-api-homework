
var buttonDiv = $("#buttons");
var addBtn = $("#add-topic");
var topicInput = $("#topic-input");
var topics = ["cat", "dog", "kangaroo", "trebuchet"];
var limit = 10;
var clicked = "";



//make buttons by going through topics array
var renderButtons = function () {
    //empty the buttons-div first
    buttonDiv.empty();
    //create button for all the elements in topics array, append to button-div
    for (var i = 0; i < topics.length; i++) {
        var newDiv = $("<div class='newImgDiv col-md-2'>")
        var newBtn = $("<a>");
        newBtn.text(topics[i]);
        var newTopic = topics[i];
        newBtn.attr({
            id: "btn-" + i,
            "data-gif": newTopic,
            "class": "gif-btn btn btn-primary",
        });
        newDiv.append(newBtn);
        buttonDiv.append(newDiv);
    }
}

//empty the buttonDiv to make sure not to make duplicate buttons
//function to get user input and add to topics by addTopic(), then render the buttons again.
addBtn.on("click", function (event) {
    event.preventDefault();
    buttonDiv.empty();
    addTopic();
    renderButtons();
});

//gets the input value of the user to add into the topics array.
var addTopic = function () {
    var topicToAdd = topicInput.val();
    topics.push(topicToAdd);
}

//function to get gif using data attribute
$(document.body).on("click", ".gif-btn", function (event) {
    event.preventDefault();
    clicked = $(this).attr("data-gif");
    getGif(clicked);
});

//calls gifs using ajax
var getGif = function (gif) {
    $("#gifs").empty();
    var apikey = "dc6zaTOxFJmzC";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=" + apikey + "&limit=" + limit;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item col-md-3'>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var image = $("<img>");
            image.attr("src", response.data[i].images.fixed_height_still.url);
            image.attr("data-still", response.data[i].images.fixed_height_still.url);
            image.attr("data-animate", response.data[i].images.fixed_height.url);
            image.attr("data-state", "still");
            image.attr("class", "loadedGif");
            gifDiv.append(p, image);
            $("#gifs").prepend(gifDiv);
        }
    });
}

//load 10 more gifs
$("#loadMore").on("click", function () {
    limit = limit + 10;
    getGif(clicked);
});

//gifs onclick to make still/animate
$(document.body).on("click", ".loadedGif", function (event) {
    console.log("gif clicked");
    console.log(this);
    var state = $(this).attr("data-state");
    var dataStill = $(this).attr("data-still");
    var dataAnimate = $(this).attr("data-animate");
    console.log(state);
    if (state === "still") {
        $(this).attr("src", dataAnimate)
        $(this).attr("data-state", "animate")
    }
    else if (state === "animate") {
        $(this).attr("src", dataStill)
        $(this).attr("data-state", "still")
    }
});

//reset button onclick
$("#reset").on("click", function () {
    limit = 10;
    clicked = "";
    $("#gifs").empty();
})

renderButtons();
