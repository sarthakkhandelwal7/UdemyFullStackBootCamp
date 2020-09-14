var express = require("express");
var router  = express.Router({mergeParams: true}); 
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = require("../middleware/index");

router.get("/new", middlewareObj.isLoggedIn, function(request, response){
    Campground.findById(request.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            response.render("comments/new", {campground: campground});
        }
    });
});

router.post("/", middlewareObj.isLoggedIn, function(request, response){
    Campground.findById(request.params.id, function(err, campground){
        if(err){
            console.log(err);
            response.redirect("/campground"+request.params.id);
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

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middlewareObj.checkCommentOwnership, function(request, response){
    Comment.findById(request.params.comment_id, function(err, foundComment){
        if(err){
            response.redirect("back");
        } else {
            response.render("comments/edit", {campground_id: request.params.id, comment: foundComment});
        }
    });
});

//COMMENT UPDATE
router.put("/:comment_id", middlewareObj.checkCommentOwnership, function(request, response){
    Comment.findByIdAndUpdate(request.params.comment_id, request.body.comment, function(err, updatedComment){
        if(err){
            response.redirect("back");
        } else {
            response.redirect("/campgrounds/" + request.params.id);
        }
    });
});

router.delete("/:comment_id", middlewareObj.checkCommentOwnership, function(request, response){
    Comment.findByIdAndRemove(request.params.comment_id, function(err){
        response.redirect("/campgrounds/"+ request.params.id);
    });
});

module.exports = router;