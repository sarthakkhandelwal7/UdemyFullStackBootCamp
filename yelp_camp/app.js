var express = require("express");
var app = express();
var body_parser = require("body-parser")

app.use(body_parser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Samlon Creek", image: "https://images.pexels.com/photos/266436/pexels-photo-266436.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name: "Granite Hill", image: "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name: "Mount Goat's Rest", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
];

app.get("/", function(request, response){
    response.render("landing");
});

app.get("/campgrounds", function(request, response){
    response.render("campgrounds", {campgrounds: campgrounds});
});

app.post('/campgrounds', function(request, response){
    var name = request.body.name;
    var image = request.body.image;
    var new_campground = {name: name, image: image}
    campgrounds.push(new_campground);
    response.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(request, response){
    response.render("new.ejs");
});

app.listen(3000, function(){
    console.log("Server started");
});