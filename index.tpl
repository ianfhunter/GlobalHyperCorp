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
        console.log(data);
        objects = objectify(data);
        console.log("complete");
        
        gtc = document.getElementsByClassName("tab-container")[0];
        gtc.innerHTML = GeographicOrderedHTML(objects);
        //hack below
        reapplyCSS();
    }
    window.onload = populate;
</script>

</head>
<body>
    <div class="global-tab-container">
        <div class="global tab-inner" >+ Global</div>
        <div class="tab-inner tab-balance">&#8369; 132131.12B</div>
        <div class="tab-inner tab-yearonyear">5.9%</div> 
        <div class="tab-container">

        </div>	
    </div>
</body>
</html