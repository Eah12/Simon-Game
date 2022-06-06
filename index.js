//check jQuery ready
$(document).ready(function() {

  var buttonColors = ["red", "blue", "green", "yellow"];
  var gamePattern = [];
  var userClickedPattern = [];
  var gameStarted = false;
  var gameLevel = 0;

  $(document).keydown(function(e) {
    console.log(e.key);
    if (e.key === ' ' && gameStarted === false) {
      $("#level-title").animate({
        opacity: 0
      }, 200);
      setTimeout(function() {
        Sequence();
      }, 1000);
    }
  });

  function Sequence() {
    $("#level-title").text("Level " + gameLevel).animate({
      opacity: 1
    }, 500);;

    // color picker
    setTimeout(function() {
      gameStarted = true;
      // -gen a random num
      var randomNumber = Math.floor(Math.random() * 4);
      // -switch a ranNum to [color]
      var randomChosenColor = buttonColors[randomNumber];
      // -add the color to gamePattern[]
      gamePattern.push(randomChosenColor);
      // -play sound & animation
      playAnimate(randomChosenColor);
      playSound(randomChosenColor);
    }, 1000);
  }

  // user click handler
  // -function start when classes .btn clicked
  $(".btn").click(function(e) {
    if (gameStarted === true) {
      // -get .btn id that the user clicked
      var userChosenColor = e.target.id;
      // -add id that the user clicked to userClickedPattern[]
      userClickedPattern.push(userChosenColor);
      // -play sound & animation
      pressAnimate(userChosenColor);
      playSound(userChosenColor);
      // check user input
      checkAnswer(userClickedPattern.length)
    }
  });

  // playSound function
  function playSound(name) {
    var a = "sounds/" + name + ".mp3";
    var audio = new Audio(a);
    audio.play();
  }

  // playAnimate function
  function playAnimate(name) {
    $("#" + name).animate({
      opacity: 0.5
    }, 200);
    $("#" + name).animate({
      opacity: 1
    }, 300);
  }

  // pressAnimate function
  function pressAnimate(name) {
    $("#" + name).addClass("pressed");
    setTimeout(
      function() {
        $("#" + name).removeClass("pressed");
      }, 100);
  }

  // checkAnswer function
  function checkAnswer(currentLevel) {
    if (currentLevel === gamePattern.length) {
      if (JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern)) {
        userClickedPattern = [];
        gameLevel++;
        setTimeout(
          function() {
            Sequence();
          }, 1000);
      } else {
        gameover();
      }
    } else {
      for (var i = 0; i <= currentLevel; i++) {
        if (userClickedPattern[currentLevel - 1] !== gamePattern[currentLevel - 1]) {
          gameover();
        }
      }
    }
  }

  // gameover function
  function gameover() {
    gameStarted = false;
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(
      function() {
        $("body").removeClass("game-over");
      }, 200);
    for (var i = 0; i < 5; i++) {
      $("#level-title").text("Game Over").animate({
        opacity: 0.5
      }, 200);
      $("#level-title").text("Game Over").animate({
        opacity: 1
      }, 200);
    }
    setTimeout(
      function() {
        location.reload();
      }, 3000);
  }
});
