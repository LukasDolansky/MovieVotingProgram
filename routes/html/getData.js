//This script populates the dropdown lists with valid entries
async function populateLists() {
    var oscarData = {};
    var categories = [];

    await fetch('../../oscar_data.json')
    .then( async(response)=> {
        oscarData = await response.json();

        for(var i = (oscarData.length - 1); i >= 0 ; i--) {
            exists = false;
            var optionElement = document.createElement("option");
            optionElement.value = oscarData[i].category;
            if(optionElement.value.includes("HONORARY") || 
                optionElement.value.includes("SPECIAL ACHIEVEMENT") ||
                optionElement.value.includes("SPECIAL AWARD")) {
                    continue;
                }
            for(var j = 0; j < categories.length; j++) {
                if(categories[j] == optionElement.value) {
                    exists = true;
                    break;
                }
            }
            if(exists == false) {
                categories.push(optionElement.value);
                document.getElementById("category-list").appendChild(optionElement);
            }
        }
    })

    for(var i = 2019; i >= 1927; i--) {
      var optionElement = document.createElement("option");
      optionElement.value = i;
      document.getElementById("years-list").appendChild(optionElement);
    }
}