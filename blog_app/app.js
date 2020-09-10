const { response, request } = require('express');

var bodyParser = require('body-parser'),
methodOverride = require('method-override'),
expressSanitizer = require('express-sanitizer'),
mongoose    = require('mongoose'),
express     = require('express'),
app         = express();

mongoose.connect("mongodb://localhost:27017/blog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(expressSanitizer());
app.use(methodOverride("_method"));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

app.get("/", (request, response) => {
    response.redirect("/blogs");
});

app.get("/blogs", (request, response) => {
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            response.render("index", {blogs: blogs});
        }
    });
});

app.get("/blogs/new", (request, response) => {
    response.render("new");
});

app.post("/blogs", (request, response) => {
    request.body.blog.body = request.sanitizer(request.body.blog.body);
    Blog.create(request.body.blog, (err, blog) => {
        if(err){
            response.render("new");
        } else {
            response.redirect('/blogs');
        }
    });
});

app.get("/blogs/:id", (request, response) => {
    Blog.findById(request.params.id, (err, foundBlog) => {
        if(err){
            response.redirect('/blogs');
        } else {
            response.render("show", {blog: foundBlog});
        }
    });
});

app.get("/blogs/:id/edit", function(request, response){
    Blog.findById(request.params.id, function(err, foundBlog){
        if(err){
            response.redirect("/blogs");
        } else {
            response.render("edit", {blog:foundBlog});
        }
    });
});

app.put("/blogs/:id", function(request, response){
    request.body.blog.body = request.sanitizer(request.body.blog.body);
    Blog.findByIdAndUpdate(request.params.id, request.body.blog, function(err, updatedBlog){
        if(err){
            response.redirect("/blogs");
        } else {
            response.redirect("/blogs/"+updatedBlog._id);
        }
    });
});

app.delete("/blogs/:id", function(request, response){
    Blog.findByIdAndRemove(request.params.id, function(err){
        response.redirect("/blogs");
    });
});

var port = 4000
var ip = "127.0.0.1"
app.listen(port, ip, () => {
    console.log("Server started!! ;)");
});