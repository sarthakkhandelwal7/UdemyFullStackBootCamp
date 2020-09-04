var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get('/', function(request, response){
    response.render("landing");
});

app.get('/campgrounds', function(request, response){
    response.render("campgrounds");
});

app.get('/campgrounds/new', function(request, response){
    response.render("new");
});

var port = 3001
var ip = "127.0.0.1"
app.listen(port, ip, function(){
    console.log('Server started')
});