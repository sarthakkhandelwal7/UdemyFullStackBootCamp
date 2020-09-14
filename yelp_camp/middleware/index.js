var Comment = require("../models/comment");
var Campground = require("../models/campground");

middlewareObj = {}

middlewareObj.checkCampgroundOwnership = function(request, response, next) {
    if(request.isAuthenticated()){
        Campground.findById(request.params.id, function(err, foundCampground){
            if(err){
                response.redirect("back");
            } else {
                if(foundCampground.author.id.equals(request.user._id)){
                    next();
                } else {
                    response.send("you are not authorized");
                }
            }
        });
    } else {
        response.send("You are not logged in");
    }
}

middlewareObj.checkCommentOwnership = function(request, response, next){
    if(request.isAuthenticated()){
        Comment.findById(request.params.comment_id, function(err, foundComment){
            if(err){
                response.redirect("back");
            } else {
                if(foundComment.author.id.equals(request.user._id)){
                    next();
                } else {
                    response.send("you are not authorized");
                }
            }
        });
    } else {
        response.send("You are not logged in");
    }
}

middlewareObj.isLoggedIn = function(request, response, next){
    if(request.isAuthenticated()){
        return next();
    }
    response.redirect("/login");
}

module.exports = middlewareObj;