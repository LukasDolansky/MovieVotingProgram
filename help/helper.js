var ParseCSV = function() {
    console.log("Parsing .csv file to JSON...");

    let csvToJson = require('convert-csv-to-json');

    let fileInputName = 'oscar_data.csv'; 
    let fileOutputName = 'oscar_data.json';

    csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
    
};

ParseCSV();