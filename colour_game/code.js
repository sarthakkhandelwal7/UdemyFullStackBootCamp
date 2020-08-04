var num_squares = 6;
var colour;
var picked_colour;
var squares = document.querySelectorAll(".square");
var message_display = document.getElementById("message");
var reset_button = document.getElementById("reset");
mode_button = document.querySelectorAll(".mode");

init();

function init(){
    //mode buttons event liseners
    for(var i = 0; i < mode_button.length; i++){
        mode_button[i].addEventListener("click", function(){
            mode_button[0].classList.remove("selected");
            mode_button[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? num_squares = 3: num_squares = 6;
            reset()
        })
    }

    for(var i = 0; i < squares.length; i++){
        colour = generate_colours(num_squares);
        squares[i].style.background = colour[i];
        squares[i].addEventListener('click', function(){
            var clicked_colour = this.style.background
            if(clicked_colour === picked_colour){
                message_display.textContent = "Correct";
                change_colour();
                reset_button.textContent = "Play Again?";
            }
            else{
                this.style.background = "#232323";
                message_display.textContent = "Try Again!";
            }
        })
    }
    reset();
}


function reset(){
    colour = generate_colours(num_squares);
    picked_colour = colour[Math.floor(Math.random()*colour.length)];
    document.getElementById("colour_display").textContent = picked_colour;

    for(var i = 0; i < squares.length; i++){
        if(colour[i]){
            squares[i].style.display = "block";
            squares[i].style.background = colour[i];
        }
        else{
            squares[i].style.display = "none";
        }
    }
    document.querySelector('h1').style.background = "steelblue";
    message_display.textContent = "";
    reset_button.textContent = "New Colours";

}


reset_button.addEventListener('click', function(){
    reset();
})

function change_colour(){
    for(var i = 0; i < colour.length; i++){
        squares[i].style.background = picked_colour;
    }
    document.querySelector('h1').style.background = picked_colour;
}

function generate_colours(num){
    var arr = []
    for(var i = 0; i < num; i++){
        arr.push(random_colour());
    }
    return arr;
}


function random_colour(){
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);

    return "rgb(" + red + ", " + green + ", " + blue + ")";
}