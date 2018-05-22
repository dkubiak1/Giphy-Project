var buttonNames = ["Pineapple", "Orange", "Banana", "Mango", "Apple"];
var tag = $(this).attr


function renderButtons() {  
    $("#buttons-view").empty();
  for (i = 0; i <buttonNames.length; i++) {

       var a = $("<button>")
        
       a.addClass("fruit");
       a.attr("data-name", buttonNames[i]);
       a.text(buttonNames[i]);
       $("#buttons-view").append(a);
      
        
    }
}  



$("#add-fruit").on("click", function() {

    event.preventDefault();
    var fruit = $("#fruit-input").val().trim();
   buttonNames.push(fruit);
   renderButtons();

});   

$("#buttons-view").on("click", ".fruit", function() {
    
    var audio = new Audio('assets/images/blop.mp3');
    audio.play();

   var limit = $("#limit").val();
   var tag = $(this).attr("data-name"); 
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        tag + "&api_key=dc6zaTOxFJmzC&limit=" + limit;
    
$.ajax({
  url: queryURL,
  method: "GET"
})
    .then(function(response){
    
  
        var results = response.data;

        
   

    for (i = 0; i < results.length; i++) {

  
    var imgUrl = results[i].images.fixed_height.url
    var imgUrlStill = results[i].images.fixed_height_still.url
    var image = $("<img>")
    
    image.attr("src", imgUrlStill);
    image.attr("data-state", "still")
    image.attr("index", i);
    image.attr("data-still", imgUrlStill)
    image.attr("data-animate", imgUrl)
    

    var rating = results[i].rating;
    var p = $("<p>").text("Rating: " + rating)
       
        $("#images").append(image);
        $("#images").append(p);
    
        }

    });

});



$("#images").on("click", "img", function() {
    var state = $(this).attr("data-state");
    if (state == "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state","still");
    } else if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state","animate");
    }
});
renderButtons();




