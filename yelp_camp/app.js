var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    Campground   = require("./models/campground"),
    seedDB       = require("./seeds");


mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

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
    Campground.findById(request.params.id).populate("comments").exec((err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
            response.render("show", {campground: foundCampground});
        }
    });
});

var port = 3001
var ip = "127.0.0.1"
app.listen(port, ip, function(){
    console.log('Server started')
});