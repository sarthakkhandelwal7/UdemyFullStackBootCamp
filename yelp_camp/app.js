const express        = require("express"),
      app            = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose"),
      passport       = require("passport"),
      flash          = require("connect-flash"),
      LocalStrategy  = require("passport-local"),
      methodOverride = require("method-override"),
      User           = require("./models/user");

const commentRoutes       = require("./routes/comments"),
      campgroundRoutes    = require("./routes/campgrounds"),
      indexRoutes          = require("./routes/index");

//mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
mongoose.connect("mongodb+srv://webdev:sarthak7189@yelpcamp.5c8gh.mongodb.net/<dbname>?retryWrites=true&w=majority", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "Kesenai yume mo tomarenai ima mo Dareka no tame ni tsuyoku nareru nara Nando demo tachiagare",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(request, response, next){
    response.locals.currentUser = request.user;
    response.locals.error = request.flash("error");
    response.locals.success = request.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

var port = process.env.PORT || 3000
app.listen(port, function(){
    console.log('Server started')
});