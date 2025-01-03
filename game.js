
// game elements
var buttons=["red","yellow","blue","green"];
var pattern=[];
var level=0;
function nextSequence(){
    var next=Math.floor(Math.random()*4);
    var btn=buttons[next];
    pattern.push(btn);
    $("."+btn).fadeOut().fadeIn().toggleClass("pressed");
    playSound(btn);
    $(".heading").html("LEVEL "+level);
    level++;
}


function playSound(name){
    var playAudio=new Audio("./sounds/"+name+".mp3");
    playAudio.play();

}

var userClickedPattern=[];
var userClicked;

$(".btn").click(function (event) {
        userClicked=event.target;
        var userClicked=$(userClicked).attr('id');
        userClickedPattern.push(userClicked);
        userClickedPattern;
        $("."+userClicked).fadeOut().fadeIn().toggleClass("pressed").toggleClass("pressed");
        playSound(userClicked);
        checkAnswer(userClickedPattern.lastIndexOf(userClicked));
});    

//game algorithm 
var start=false;
$(document).keydown(function(event) {
    if(event.key==='a'){
        startOver();
        nextSequence();
        start=true;
        $('.heading').html("LEVEL 0");
        
    }
});

function checkAnswer(currentLevel){
    // Check if the LAST button clicked is right
    if(userClickedPattern[currentLevel] == pattern[currentLevel]){
      // set a variable to count how many colors the user got right
      var count = 0;
      // loop through the two arrays, and compare if EACH ONE of the values is the same as the other
      for (var i = 0; i < pattern.length; i++) {
        if(pattern[i] === userClickedPattern[i]){
          // if the two values matche, count + 1
          count++;
        }
      }
      // ONLY if the count is the same number as gamePattern length,
      // (meaning each one of the colors was right) then it's success
      if(count === pattern.length){
        console.log("success");
        userClickedPattern=[];
        setTimeout(function(){
            nextSequence();
          }, 1000);
      }
      // otherwise, it's wrong and trigger Game Over
    } else {
      console.log("wrong");
        var wrongAudio = new Audio("./sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over");
        $("h2").text("(Press Any Key to Restart)")
        startOver();
    }
  }

  function startOver(){
    level = 0;
    pattern = [];
    userClickedPattern=[];
    start = false;
  }








