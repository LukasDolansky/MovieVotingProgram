function getData(category, year, isWinner) {
    const apiBase = 'http://localhost:3000/api/sort/?';
    var thisCategory = '';
    var thisYear = '';
    var thisIsWinner = '';
  
    if(category != undefined) {
      thisCategory = 'category=' + category + '&';
    }
    if(year != undefined) {
      thisYear = 'year=' + year + '&';
    }
    if(isWinner != undefined) {
      thisIsWinner = 'winner' + isWinner;
    }
  
    var apiURL = apiBase + thisCategory + thisYear + thisIsWinner;
    
    var testData = await fetch(apiURL)
    .then(async testData => {
      testData = await testData.json();
      return testData;
    });
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