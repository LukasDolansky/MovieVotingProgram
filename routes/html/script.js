const { response } = require("express");
const getData = require("./results/getData");

$("button").click(function(){
    $.get("https://api.publicapis.org/entries", function(data, status){
      alert("Data: " + data + "\nStatus: " + status);
      document.getElementById("demo").innerHTML = data;
    });
  }); 
  function movePage(){
      location.replace("another.html")
  }

function setupWebPage(){
  var urlSearchParams = new URLSearchParams(window.location.search);
  var category = urlSearchParams.get('category');
  var year = urlSearchParams.get('year');
  var winner = urlSearchParams.get('winner');
  movieListContainer = document.createElement('div');
  document.getElementsByTagName('body')[0].appendChild(movieListContainer);

  var movieData = getData(category, year, winner);

  for(i = 0; i < data.length; ++i){
    title = document.createElement('p');
    poster = document.createElement('img');
    movieLink = document.createElement('a');
    description = document.createElement('p');
    
    //insert data into html elements
    title.textContent = data[i].title;
    poster.setAttribute('src', data.posterURL);
    movieLink.textContent = data[i].imdbLink;
    movieLink.setAttribute('href', data[i].imdbLink)
    description.textContent =data[i].description;



    movieListContainer.appendChild(title);
    movieListContainer.appendChild(poster);
    movieListContainer.appendChild(movieLink);
    movieListContainer.appendChild(description);
  }
  

}