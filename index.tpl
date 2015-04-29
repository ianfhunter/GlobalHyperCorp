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
    }
    window.onload = populate;
</script>

</head>
<body>
    <div class="global-tab-container"></div>
</body>
</html