<html>
<head>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" />
<link rel="stylesheet" href="main.css" />
<script src="main.js"></script>
<!-- Latest compiled and minified JavaScript -->
<!--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script> -->
<script>
    function populate(){
        var data = {{!data}};
        objects = objectify(data);
        
        gtc = document.getElementsByClassName("global-tab-container")[0];
        gtc.innerHTML = GeographicOrderedHTML(objects);
        
        applyToggle();
    }
    
    
    function switchOrdering(){
        var data = {{!data}};
        objects = objectify(data);  
        
        gtc = document.getElementsByClassName("global-tab-container")[0];
        gtc.innerHTML = ProductOrderedHTML(objects);
        
        applyToggle();
    }
    
    window.onload = populate;
</script>

</head>
<body>
    <div>
        <img src="http://i.gyazo.com/cf6e393d5c8d507a67c21e22f4943425.png" />
    </div>
    <button type="button" onclick="toggleNegativeYOY()">Show only Negative YearOnYear changes</button>
    <button type="button" onclick="switchOrdering()">Order By Product</button>
    <button type="button" onclick="populate()">Order By Region</button>

    <div class="global-tab-container"></div>
</body>
</html