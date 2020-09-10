var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    Campground   = require("./models/campground"),
    Comment      = require("./models/comment"),
    seedDB       = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
seedDB();

app.get('/', function(request, response){
    response.render("landing");
});

app.get('/campgrounds', function(request, response){
    Campground.find({}, (err, campgrounds) => {
        if(err){
            console.log(err);
        } else {
            response.render("campgrounds/index", {campgrounds:campgrounds});
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
    response.render("campgrounds/new");
});

app.get("/campgrounds/:id", (request, response) => {
    Campground.findById(request.params.id).populate("comments").exec((err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
            response.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

app.get("/campgrounds/:id/comments/new", function(request, response){
    Campground.findById(request.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            response.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(request, response){
    Campground.findById(request.params.id, function(err, campground){
        if(err){
            console.log(err);
            response.redirect("/campground"+request.param.id);
        } else {
            Comment.create(request.body.comment, function(err, comment){
                if(err){
                    console.log(err);

                } else {
                    campground.comments.push(comment);
                    campground.save();
                    response.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    });
});
var port = 3001
var ip = "127.0.0.1"
app.listen(port, ip, function(){
    console.log('Server started')
});