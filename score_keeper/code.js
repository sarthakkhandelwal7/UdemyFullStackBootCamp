var p1Display = document.getElementById("p1_display");
var p2Display = document.getElementById("p2_display");

var p1_score = 0;
var p2_score = 0;

var game_over = false;
var winning_score = 5;

document.getElementById("p1_btn").addEventListener('click', function(){
    if(!game_over){
        p1_score++;
        if(p1_score === winning_score){
            p1Display.classList.add("winner")
            game_over = true;
        }
        p1Display.innerHTML = p1_score;
    }
})

document.getElementById("p2_btn").addEventListener('click', function(){
    if(!game_over){
        p2_score++;
        if(p2_score === winning_score){
            p2Display.classList.add("winner")
            game_over = true;
        }
        p2Display.innerHTML = p2_score;
    }
})

document.getElementById("reset").addEventListener('click', reset)

function reset(){
    p2_score = p1_score = 0;
    p1Display.innerText = 0;
    p2Display.innerText = 0;
    p1Display.classList.remove("winner");
    p2Display.classList.remove("winner");
    game_over = false;
}

document.querySelector("input").addEventListener("change", function(){
    reset();
    var score = Number(this.value);
    winning_score = score;
    document.querySelector("h3 span").innerText = score;

})