function reapplyCSS(){
    var links = document.getElementsByTagName("link");

    for (var x in links) {
        var link = links[x];

        if (link.getAttribute("type").indexOf("css") > -1) {
            link.href = link.href + "?id=" + new Date().getMilliseconds();
        }
    }
}

//Removes needless hierarchy in json so it's easier to parse
function objectify(data){   
    var newData = [];
    for(brand in data){
        console.log("Store");
        store = data[brand]
        console.log(store);
        store.forEach(function(shop){
            console.log("shop");
            console.log(shop);
            newData.push({revenue:shop["revenue"],product:shop["productLine"],continent:shop["geography"][0],country:shop["geography"][1]})
        });
    }    
    return newData
}


function GeographicOrderedHTML(data){
    data.sort(function(a, b){
        //sort our array by continent, then by country
        if(a.continent > b.continent){
            return 1;
        }
        if(a.continent < b.continent){
            return -1;
        }
        if(a.country > b.country){
            return 1;
        }
        if(a.country < b.country){
            return -1;
        }
        return 0;
    });

    resultantHTML = ""
    lastContinent = ""
    data.forEach(function(shop){
        currentHTML = "";
        newContinent = false;
        //if new continent, create header
        
        if (shop.continent != lastContinent){
            currentHTML = "<div class=\"global tab-inner\" >+ "+shop.continent+"</div>" +
                          "<div class=\"tab-inner tab-balance\">&#8369; 132131.12B</div>" +
                          "<div class=\"tab-inner tab-yearonyear\">5.9%</div>" +
                          "<div class=\"tab-container\">"
            newContinent = true;
            lastContinent = shop.continent;
        }else{
            currentHTML ="<div class=\"tab-container\">"
        }

        currentHTML += "<div class=\"global tab-inner\" >+ "+shop.country+"</div>" +
                      "<div class=\"tab-inner tab-balance\">&#8369; "+shop.revenue[2022]+"B</div>" +  //rounded to .00
			          "<div class=\"tab-inner tab-yearonyear\">5.9%</div> "

       
        resultantHTML += "</div>";
                      
        resultantHTML += currentHTML;
    });
    return resultantHTML;
}


