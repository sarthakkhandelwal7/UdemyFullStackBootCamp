var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const { request, response } = require("express");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundsSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundsSchema);

// Campground.create(
//     {
//         name: "Hidden Forest",
//         image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//         description: "Lovely place for camping with magnificent views"
//     }, (err, campground) => {
//         if(err){
//             console.log(err);
//         } else {
//             console.log("Newly Created Campground");
//             console.log(campground)
//         }
//     });

app.get('/', function(request, response){
    response.render("landing");
});

app.get('/campgrounds', function(request, response){
    Campground.find({}, (err, campgrounds) => {
        if(err){
            console.log(err);
        } else {
            response.render("index", {campgrounds:campgrounds});
        }
    });
    
});

app.post("/campgrounds", (request, response) => {
    var name = request.body.name;
    var image = request.body.image;
    var desc = request.body.description;
    var newCampground = {name: name, image:image, description: desc}

    Campground.create(newCampground, (err, newlyCreated) => {
        if(err){
            console.log(err);
        } else {
            response.redirect("/campgrounds");
        }
    });
});

app.get('/campgrounds/new', function(request, response){
    response.render("new");
});

app.get("/campgrounds/:id", (request, response) => {
    Campground.findById(request.params.id, (err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
            response.render("show", {campgrounds: foundCampground});
        }
    });
});

var port = 3001
var ip = "127.0.0.1"
app.listen(port, ip, function(){
    console.log('Server started')
});