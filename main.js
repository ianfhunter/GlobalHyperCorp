//Removes needless hierarchy in json so it's easier to parse
function objectify(data){   
    var newData = [];
    for(brand in data){
        store = data[brand]
        store.forEach(function(shop){
            newData.push({brand:brand,revenue:shop["revenue"],product:shop["productLine"],continent:shop["geography"][0],country:shop["geography"][1]})
        });
    }    
    console.log(newData)
    return newData;
}

function getHTMl(data,chain,title){
    console.log(chain.length);
    if( chain.length == 0){
    
        //console.log(title + "UEEEEEE");
        //final nodes
        console.log("end node, we have " + data.length + " shop(s)");
        var returnHTML = "";

        for(var idx = 0; idx != data.length;idx++){ 
            var store = data[idx];
            var revenue2022 = store.revenue[2022];
            var revenue2021 = store.revenue[2021];
            var diff = (revenue2022 - revenue2021)/revenue2021
            returnHTML += 
                   "<div class=\"tab-container list-group-item list-group-item-warning\">" + 
                        "<div class=\"tab-inner\" >+ "+store.continent +"</div>"+
                        "<div class=\"tab-inner\" >+ "+store.country +"</div>"+
                        "<div class=\"tab-inner\" >+ "+store.brand +"</div>"+
                        "<div class=\"tab-inner\" >+ "+store.product +"</div>"+
                        "<div class=\"tab-inner tab-balance\">&#8369; "+revenue2022.toFixed(2)+"B</div>"+
                        "<div class=\"tab-inner tab-yearonyear\">"+diff.toFixed(2)+"%</div> " + 
                    "</div>	";
        };
        return returnHTML;
    }
    var attrib = chain[0];//.shift();

    console.log("Working with "+ data.length + " items of "+ title + ",Lets get the headers of type " + attrib + " next.");
   
    //get financials for current item (title)
    var revenue2022 = 0;
    var revenue2021 = 0;
    for(var idx = 0; idx != data.length;idx++){
        revenue2022 += data[idx].revenue[2022];
        revenue2021 += data[idx].revenue[2021];
    }
    var diff = (revenue2022 - revenue2021)/revenue2021;
    
    //get html of the next items we're looking for
    var nextHTML =""
    var currItem = data[0][attrib];
    var itemShops = [];
    var shop = null;
    for(var idx = 0; idx != data.length;idx++){
    
        shop = data[idx];
        if(title=="HyperGlobalMegaCorp"){
                console.log(attrib + "~~~~~~~~~~~~~~");
                console.log(chain.length);
                console.log(currItem)
        }
        if(currItem != shop[attrib]){
            if(title=="Shoprite"){
            console.log("Y");
            }   
            nextHTML += getHTMl(itemShops,chain.slice(1),currItem);            
            currItem = shop[attrib];
            itemShops = [shop];
        }
        if (idx == data.length -1){
            itemShops.push(shop);
            if(title=="Shoprite"){
                console.log("N" + itemShops);
            }  
            nextHTML += getHTMl(itemShops,chain.slice(1),currItem);            
            itemShops = [];
        }
        if(currItem == shop[attrib] && idx != data.length -1){            
            if(title=="Shoprite"){
            console.log("M");
            }  
            itemShops.push(shop);
        }
    }
    return "<div class=\"tab-container list-group-item\">"+
            "<div class=\"tab-inner\" >+ "+title+"</div>"+
            "<div class=\"tab-inner tab-balance\">&#8369; "+revenue2022.toFixed(2)+"B</div>"+
            "<div class=\"tab-inner tab-yearonyear\">"+diff.toFixed(2)+"%</div> "+
            "<div class=\"tab-container\">"+
                nextHTML + 
            "</div>	"+
        "</div>";
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
        if(a.brand > b.brand){
            return 1;
        }
        if(a.brand < b.brand){
            return -1;
        }
        if(a.product > b.product){
            return 1;
        }
        if(a.product < b.product){
            return -1;
        }
        return 0;
    });
    return getHTMl(data,["continent","country","brand","product",""],"HyperGlobalMegaCorp")
}


