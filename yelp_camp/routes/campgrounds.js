var express = require("express");
var router  = express.Router(); 
var Campground = require("../models/campground");


router.get('/', function(request, response){
    Campground.find({}, (err, campgrounds) => {
        if(err){
            console.log(err);
        } else {
            response.render("campgrounds/index", {campgrounds:campgrounds, currentUser: request.user});
        }
    });
    
});

router.post("/", isLoggedIn, (request, response) => {
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

router.get('/new', function(request, response){
    response.render("campgrounds/new");
});

router.get("/:id", (request, response) => {
    Campground.findById(request.params.id).populate("comments").exec((err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
            response.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

function isLoggedIn(request, response, next){
    if(request.isAuthenticated()){
        return next();
    }
    response.redirect("/login");
}

module.exports = router;