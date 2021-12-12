API readme:

Usage: This API will query relevant external API's to gather data on all previous Oscar nominated
and winning movies based on specific criteria specified by the user. Multiple movie results will 
output as an array of JSON data.

Input parameters:
    Oscar award category
    Movie release year
    Award winner only

Output result: (JSON)
    Title:          (String)
    PosterURL:      (String)
    Description:    (String)
    IMDB Link:      (String)
    Rating:         (Integer)
    Ceremony Year:  (String)
    Category:       (String)
    Winner:         (String)

Syntax: 

https://movie-voting-program.herokuapp.com/api/sort/?category=[category name]&year=[release year]&winner=[true/false]