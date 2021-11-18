$("button").click(function(){
    $.get("https://api.publicapis.org/entries", function(data, status){
      alert("Data: " + data + "\nStatus: " + status);
      document.getElementById("demo").innerHTML = data;
    });
  }); 
  function movePage(){
      location.replace("another.html")
  }