
//On click the game starts
$(".start").click(function() {
  //Reset all game variables to original state
  //clearInterval(timer);
  gameInit();
  $(".splashScreen").hide();
  $(".finishScreen").hide();
  $("#myCanvas").show();
  console.log("clicked start");
  timer = setInterval("tick()", 1000);
  draw();
});

//Event listeners for arrow key presses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);