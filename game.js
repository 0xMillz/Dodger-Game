/* Manuever with the arrows keys to avoid the falling rocks.
 * After every 20 seconds of gameplay you advance to the next level.
 * You have three lives */

//$(document).ready(function () {

//Stores reference to the <canvas> element
var canvas = document.getElementById("myCanvas");
//Creating a ctx variable to store the 2D rendering context
var ctx = canvas.getContext("2d");

//Game variables
var score = 0;
var clock = 0;
var level = 1;//Game starts on level 1
var level1Bonus = true;
var level2Bonus = true;
var level3Bonus = true;
var level1Reset = true;
var level2Reset = true;
var level3Reset = true;

//Player variables
var playerHeight = 60;
var playerWidth = 50;
var playerSpeed = 5;//Moves 5px when arrow key is pressed
var lives = 3;

//Initial player starting postion
var playerX = (canvas.width-playerWidth)/2;
var playerY = canvas.height-playerHeight;

//Create a player object
var player = {
  x: playerX,
  y: playerY,
  width: playerWidth,
  height: playerHeight,
  speed: playerSpeed,
  lives: lives
};

// Rock variables
var rockWidth = 30;
var rockHeight = 30;
var totalRocks = 15;
var rocks = [];//Array of rock objects
for (var i = 0; i < totalRocks; i++) {
    addRock();
}

//Adds a rock to the array of rocks
function addRock() {
    var rock = {
        width: rockWidth,
        height: rockHeight,
        color: "gray",
        y: -100
    };
    resetRock(rock);
    rocks.push(rock);
}

//Arrow key variables
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

//Places a rock at a random position at the top of the screen,
//falling at a random speed
function resetRock(rock) {
  if (clock <= 20) {
    rock.x = Math.random() * (canvas.width - rockWidth);
    rock.y = -100 - Math.random() * 40;
    rock.speed = 0.5 + Math.random() * 0.8;
  }
  else if (clock <= 40) {
    rock.width = Math.random() * 40 + 10;
    rock.height = Math.random() * 60 + 20;
    rock.x = Math.random() * (canvas.width - rockWidth);
    rock.y = -200 - Math.random() * 30;
    rock.speed = 1 + Math.random() * 0.8;
    rock.color = "black";
  }
  else if (clock <= 60) {
    rock.width = 10;
    rock.height = 10;
    rock.x = Math.random() * (canvas.width - rockWidth);
    rock.y = -200 - Math.random() * 40;
    rock.speed = 1 + Math.random() * 0.8;
    rock.color = "white";
  }
  else {
    rock.width = 10;
    rock.height = 40;
    rock.x = Math.random() * (canvas.width - rockWidth);
    rock.y = -200 - Math.random() * 40;
    rock.speed = 1 + Math.random() * 0.8;
    rock.color = "yellow";
  }
}

//Event listeners for arrow key presses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Checks to see if arrow keys are pressed
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
    else if(e.keyCode == 40) {
        downPressed = true;
    }
}

//Checks to see if arrow keys are released
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
    }
}

//Draws the player
function drawPlayer () {
  ctx.beginPath();
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(player.x, player.y, player.width, player.height);
  ctx.fill();
  ctx.closePath();
}

//Level 1 rocks are gray
function drawRocks () {
  for (var i = 0; i < rocks.length; i++) {
        var rock = rocks[i];
        ctx.fillStyle = rock.color;
        ctx.fillRect(rock.x, rock.y, rock.width, rock.height);
    }
}

//Level 2 rocks are black
function drawRocks2 () {
  for (var i = 0; i < rocks.length; i++) {
    var rock = rocks[i];
    ctx.fillStyle = rock.color;
    ctx.fillRect(rock.x, rock.y, rock.width, rock.height);
  }
}

//Level 3 rocks are white
function drawRocks3 () {
  for (var i = 0; i < rocks.length; i++) {
        var rock = rocks[i];
        ctx.fillStyle = rock.color;
        ctx.fillRect(rock.x, rock.y, rock.width, rock.height);
    }
}

//Call before draw to translate the context for the shake effect
function preShake() {
  ctx.save();
  var dx = Math.random()*15;
  var dy = Math.random()*15;
  ctx.translate(dx, dy);
}

//Restores the context to its original position
function postShake() {
  ctx.restore();
}

//Draws level one
function level1 () {
  document.getElementById("myCanvas").style.background = "url('http://img00.deviantart.net/934b/i/2007/261/9/a/2d_rpg_game_background_by_willowwisp.jpg')";


  for (var i = 0; i < rocks.length; i++) {
    var rock = rocks[i];

      // test for rock-block collision
      if (isColliding(rock, player)) {
        lives--;
        resetRock(rock);//Stops them from continuing to collide
      }

      // advance the rocks
      rock.y += rock.speed*2;

      // if the rock is below the canvas
      if (rock.y > canvas.height) {
        resetRock(rock);
      }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);


if (clock >= 19) {
    preShake();
    drawPlayer();
    drawRocks2();
    postShake();
  } else {
    drawPlayer();
    drawRocks2();
    if (clock < 3)
      drawLevel();
  }
}

//Draws level 2
function level2 () {
if (level === 1)
    level++;
  document.getElementById("myCanvas").style.background = "url('http://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/335550/06beefca8fcadd4479239bdee65630dcacd084fc.jpg')";
  for (var i = 0; i < rocks.length; i++) {
    var rock = rocks[i];

    // test for rock-block collision
    if (isColliding(rock, player)) {
      lives--;
      resetRock(rock);//Stops them from continuing to collide
    }

    // advance the rocks
    rock.y += rock.speed*2;

    // if the rock is below the canvas,
    if (rock.y > canvas.height) {
      resetRock(rock);
    }
  }
  if (clock === 21 && level1Reset) {
    console.log("in here");
    for (var j = 0; j < rocks.length; j++) {
      var rock = rocks[j];
      resetRock(rock);
    }
    level1Reset = false;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Shake the screen for three clock ticks when level is entered
  if (clock >= 39) {
    preShake();
    drawPlayer();
    drawRocks2();
    postShake();
  } else {
    drawPlayer();
    drawRocks2();
    if (clock < 24)
      drawLevel();
  }
}

//Draws level three
function level3 () {
  if (level === 2)
    level++;

  document.getElementById("myCanvas").style.background = "url('https://annalouiseyoungs.files.wordpress.com/2013/11/snowscene.png')";
  for (var i = 0; i < rocks.length; i++) {
    var rock = rocks[i];

      // test for rock-block collision
      if (isColliding(rock, player)) {
        lives--;
        resetRock(rock);//Stops them from continuing to collide
      }

      // advance the rocks
      rock.y += rock.speed*3;

      // if the rock is below the canvas,
      if (rock.y > canvas.height) {
          resetRock(rock);
      }
      else if (level1Bonus)
        resetRock(rock);

  }
  if (clock === 41 && level2Reset) {
    for (var j = 0; j < rocks.length; j++) {
      var rock = rocks[j];
      resetRock(rock);
    }
    level2Reset = false;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Shake the screen for three clock ticks when level is entered
  if (clock >= 59) {
    preShake();
    drawPlayer();
    drawRocks3();
    postShake();
  } else {
    drawPlayer();
    drawRocks3();
    if (clock < 44)
     drawLevel();
  }
}
//Draws level four
function level4 () {
  if (level === 3)
    level++;

  document.getElementById("myCanvas").style.background = "url('https://s-media-cache-ak0.pinimg.com/originals/47/0d/67/470d677d06f32921b191ab560f9a24cb.gif')";
  for (var i = 0; i < rocks.length; i++) {
    var rock = rocks[i];

      // test for rock-block collision
      if (isColliding(rock, player)) {
        lives--;
        resetRock(rock);//Stops them from continuing to collide
      }

      // advance the rocks
      rock.y += rock.speed*4;

      // if the rock is below the canvas,
      if (rock.y > canvas.height) {
          resetRock(rock);
      }
      else if (level1Bonus)
        resetRock(rock);

  }
  if (clock === 61 && level3Reset) {
    console.log("in here");
    for (var j = 0; j < rocks.length; j++) {
      var rock = rocks[j];
      resetRock(rock);
    }
    level3Reset = false;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Shake the screen for three clock ticks when level is entered
  if (clock > 82 && clock < 89) {
    preShake();
    drawPlayer();
    drawRocks3();
    postShake();
  } else {
    drawPlayer();
    drawRocks3();
    if (clock < 64)
      drawLevel();
  }
}

function draw() {
  //Keep this if-statement up here so the # of lives on screen
  //has time to update to zero before the game over alert pops up
  if (lives <= 0) {
    return endGame();
  }

  requestAnimationFrame(draw);

  //Draws the level based on the clock
  if (clock < 21) {
    level1();
  } else if (clock < 41) {
    if (level1Bonus) {
      score += 100;
      level1Bonus = false;
    }
      level2();
  } else if (clock < 61) {
    if (level2Bonus) {
      score += 100;
      level2Bonus = false;
    }
    level3();
  } else {
    if (level3Bonus) {
      score += 100;
      level3Bonus = false;
    }
    level4();
  }

  drawScore();
  drawLives();
  drawClock();

  if(rightPressed && player.x < canvas.width-playerWidth) {
    player.x+= 5;
  }
  else if(leftPressed && player.x > 0) {
    player.x -= 5;
  }
  else if (upPressed && player.y > 0)
    player.y -= 5;
  else if (downPressed && player.y < canvas.height-playerHeight)
    player.y += 5;
}

//Checks to see if the rocks and player overlapp anywhere
function isColliding(a, b) {
    //All of these conditions have to be false for function to return true
    return !(b.x > a.x + a.width || b.x + b.width < a.x || b.y > a.y + a.height || b.y + b.height < a.y);
}

//Draws the score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

//Draws the clock
function drawClock() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Clock: "+ clock, (canvas.width - 40)/2, 20);
}

//Draws # of lives left
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+ lives, canvas.width-65, 20);
}

function drawLevel () {
  console.log("Level " + level);
  ctx.font = "80px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Level " + level, canvas.width/3,canvas.height/2);
}

//Increments the score and clock every second
function tick() {
  window.setTimeout("tick()", 1000);
  score += 2;
  clock += 1;
}

function endGame() {
  $("#myCanvas").hide();
  $("#score").text(score);
  $(".finishScreen").show();
}

//On click the game starts
$(".start").click(function() {
  $(".splashScreen").hide();
  $(".finishScreen").hide();
  $("#myCanvas").show();
  draw();
  window.setTimeout("tick()", 1000);
});
