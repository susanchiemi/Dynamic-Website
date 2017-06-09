$( document ).ready(function() {
//buttons already on page
var topics = ["Sunrise", "Sunset", "Sun", "Rainbow"];


//************************* Functions ********************************
// Function that displays all gif buttons
function displayGifButtons(){
    $("#gifButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
    for (var i = 0; i < topics.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.addClass("btn btn-warning")
        gifButton.attr("data-name", topics[i]);
        gifButton.text(topics[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
// Function to add a new button
function addNewButton(){
    $("#addGif").on("click", function(){
    var action = $("#action-input").val().trim();
   if (action == ""){
      return false; // added so user cannot add a blank button
    }
    topics.push(action);

    displayGifButtons();
    return false; 
    });
}

 function removeLastButton(){
    $("removeGif").on("click", function(){
    topics.pop(action);
    displayGifButtons();
    return false;
    });
} 
// Function that displays all of the giphys
function displayGifs(){
    var nature = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + nature + "&api_key=dc6zaTOxFJmzC&limit=12";
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        $("#gifsView").empty();
        var results = response.data; //shows results of giphys
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); //div for the gifs to go inside
            gifDiv.addClass("gifDiv");
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // pulling still image of gif
            // adding div of gifs to gifsView div
            $("#gifsView").prepend(gifDiv);
             // pulling rating of gif
            var gifRating = $("<p>").text("rating: " + results[i].rating);
            gifDiv.append(gifRating);
        }
    });
}
// Calling Functions
displayGifButtons(); // displays list of buttons already created
addNewButton();
removeLastButton();
// Document Event Listeners
$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});