var searchTopics = ["Chewbacca", "Han Solo", "Luke Skywalker", "Snoke", "Ahsoka Tano", "Revan"];

var baseUrl="https://api.giphy.com/v1/gifs/search";
var apiKey="dc6zaTOxFJmzC";
var imageLimit=10;
var baseParam="?"+"api_key="+apiKey+"&limit="+imageLimit+"&q=";
var buttonCounter=0;

function addButton(topic) {
  var ele = $("<button>");
  ele.addClass("btn btn-success topic-button");
  ele.attr("id", "topic-button-"+buttonCounter);
  ele.attr("type", "button");
  ele.attr("data-topic",topic.replace(/ /g, '+'));
  ele.text(topic);

  $("#buttons-display").append(ele);
  $("#buttons-display").append('\n');
  ++buttonCounter;
}

function addTopic(topic) {
  searchTopics.push(topic);
  addButton(topic);
}

function displayImages(array) {
  $("#results-display").empty();

  for(var i=0; i<array.length; ++i) {
    var ele = $("<div>");
    ele.addClass("pull-left well clearfix");

    var temp = $("<h3>");
    temp.text("Rating: "+array[i].rating);
    ele.append(temp);

    temp=$("<img>");
    temp.addClass("result-image");
    temp.attr("alt", array[i].slug);
    temp.attr("data-still", array[i].images.fixed_height_still.url);
    temp.attr("data-animate", array[i].images.fixed_height.url);
    temp.attr("data-state", "still");
    temp.attr("src", array[i].images.fixed_height_still.url);

    ele.append(temp);

    $("#results-display").append(ele);
  }

}

function redisplayButtons() {
  buttonCounter=0;
  $("#buttons-display").empty();

  for(var i=0; i<searchTopics.length; ++i)
    addButton(searchTopics[i]);

}

function getAjaxResponse(topic) {
  $.ajax({
    url: baseUrl+baseParam+topic,
    method: "GET"
  }).done(function(response){
    displayImages(response.data);
  });

}

$(document).ready(function(){

  redisplayButtons();

  $("#search-submit").on("click", function(){
    var search=$("#search-terms").val().trim();
    addTopic(search);
  });

  $(document).on("click", ".topic-button", function(event) {
    var data = $(this).attr("data-topic");
    getAjaxResponse(data);
  });

  $(document).on("click", ".result-image", function(event) {
    var state = $(this).attr("data-state");
    if(state==="still"){
      $(this).attr("data-state", "animate");
      $(this).attr("src", $(this).attr("data-animate"));
    }
    else{
      $(this).attr("data-state", "still");
      $(this).attr("src", $(this).attr("data-still"));
    }
  });

});

