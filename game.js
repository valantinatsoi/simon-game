var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"]

var level = 0;

var started = false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level 0");
    nextSequence();
    started = true;
  }
});

function nextSequence() {

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


$(".btn").click(function() {
  // var audio = new Audio("sounds/" + $(this).attr('id') + ".mp3");
  // audio.play();

  var userChosenColour = $(this).attr('id');

  userClickedPattern.push(userChosenColour);

  playSound($(this).attr('id'));

  animatePress($(this).attr('id'));

  checkAnswer(userClickedPattern.length - 1);
});

//Sound & Animation

function playSound(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var currentColour = $("." + currentColour);

  currentColour.addClass("pressed");

  setTimeout(function() {
    currentColour.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  var gameAnswer = gamePattern[currentLevel];
  var userAnswer = userClickedPattern[currentLevel];
  if (gameAnswer === userAnswer) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("fail");
    var fail = new Audio("sounds/wrong.mp3");
    fail.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
