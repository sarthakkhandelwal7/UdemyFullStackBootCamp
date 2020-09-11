var express = require("express");
var router  = express.Router({mergeParams: true}); 
var Campground = require("../models/campground");
var Comment = require("../models/comment");

router.get("/new", isLoggedIn, function(request, response){
    Campground.findById(request.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            response.render("comments/new", {campground: campground});
        }
    });
});

router.post("/", isLoggedIn, function(request, response){
    Campground.findById(request.params.id, function(err, campground){
        if(err){
            console.log(err);
            response.redirect("/campground"+request.param.id);
        } else {
            Comment.create(request.body.comment, function(err, comment){
                //add username and id to comment

                if(err){
                    console.log(err);

                } else {
                    comment.author.id = request.user._id;
                    comment.author.username = request.user.username;
                    comment.save()
                    campground.comments.push(comment);
                    campground.save();
                    response.redirect("/campgrounds/"+campground._id);
                }
            });
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