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
    
        //final nodes
        console.log("end node, we have " + data.length + " shop(s)");
        var returnHTML = "";

        for(var idx = 0; idx != data.length;idx++){ 
            var store = data[idx];
            var revenue2022 = store.revenue[2022] / 1000;
            var revenue2021 = store.revenue[2021] / 1000;
            var diff = (revenue2022 - revenue2021)/revenue2021
            var indicator = "";
            var indicatorClass = ""
            if (diff > 0){
                indicator = "&#8593;";
                indicatorClass = "positiveYOY"
            }else if(diff < 0){
                indicator = "&#8595;";
                indicatorClass = "negativeYOY"
            }else{
                 indicator = "&#61;"
                 indicatorClass = "neutralYOY"
            }
            returnHTML += 
                   "<div class=\"tab-container " + indicatorClass + " list-group-item list-group-item-warning\">" + 
                        "<div class=\"tab-inner\" > "+store.continent +"</div>"+
                        "<div class=\"tab-inner\" > "+store.country +"</div>"+
                        "<div class=\"tab-inner\" > "+store.brand +"</div>"+
                        "<div class=\"tab-inner\" > "+store.product +"</div>"+
                        "<div class=\"tab-inner tab-balance\">&#8369; "+revenue2022.toFixed(2)+"B</div>"+
                        "<div class=\"tab-inner tab-yearonyear\">"+ diff.toFixed(2)+"%"+indicator+"</div> " + 
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
        revenue2022 += data[idx].revenue[2022] / 1000;
        revenue2021 += data[idx].revenue[2021] / 1000;
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
    var indicator = "";
    var indicatorClass = ""
    if (diff > 0){
        indicator = "&#8593;";
        indicatorClass = "positiveYOY"
    }else if(diff < 0){
        indicator = "&#8595;";
        indicatorClass = "negativeYOY"
    }else{
         indicator = "&#61;"
         indicatorClass = "neutralYOY"
    }
    
    return "<div class=\"tab-container " + indicatorClass + " list-group-item\">"+
            "<div class=\"tab-inner\" >+ "+title+"</div>"+
            "<div class=\"tab-inner tab-balance\">&#8369; "+revenue2022.toFixed(2)+"B</div>"+
            "<div class=\"tab-inner tab-yearonyear\">"+diff.toFixed(2)+"%"+indicator+"</div> "+
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

function ProductOrderedHTML(data){
    data.sort(function(a, b){
        //sort our array by continent, then by country
        if(a.product > b.product){
            return 1;
        }
        if(a.product < b.product){
            return -1;
        }
        if(a.brand > b.brand){
            return 1;
        }
        if(a.brand < b.brand){
            return -1;
        }
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
    return getHTMl(data,["product","brand","continent","country",""],"HyperGlobalMegaCorp")
}
function toggleNegativeYOY(){
    var divs = document.getElementsByClassName('positiveYOY');
    for(var i = 0; i != divs.length; ++i)
    {
        if (divs[i].style.display !== 'none') {
            divs[i].style.display = 'none';
        }
        else {
            divs[i].style.display = 'block';
        }
    }
}

function applyToggle(){
    var elems = document.getElementsByClassName('tab-container');

    for(var i = 0; i != elems.length; ++i)
    {
        elems[i].onclick=function(){
            console.log("HI");
            babies = this.children;
        
            for(var i = 0; i < babies.length; i++) {   
                if(babies[i].style.display != 'none') {
                    babies[i].style.display = 'none';   
                }else{
                    babies[i].style.display = 'inline-block'
                }
            }
      
            event.cancelBubble = true;
            if(event.stopPropagation) event.stopPropagation();
        }
    }
}
