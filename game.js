/* Manuever with the arrows keys to avoid the falling rocks.
 * After every 20 seconds of gameplay you advance to the next level.
 * You have three lives */


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
var timer = 0;//Stores the interval ID for setInterval()
var newGame = true;

//Player variables
var playerHeight = 60;
var playerWidth = 40;
var playerSpeed = 5;//Moves 5px when arrow key is pressed
var lives = 5;
var img = new Image();
img.src = "player.png";

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
  lives: lives,
  img: img
};

// Rock variables
var rockWidth = 50;
var rockHeight = 50;
var totalRocks = 18;
var rocks = [];//Array of rock objects
var rockImage = new Image();
rockImage.src = "rocks.png";
var rockImage2 = new Image();
rockImage2.src = "stal2.png";
var rockImage3 = new Image();//Second fire rock
rockImage3.src = "fire2.png";
var bossImage = new Image();//Second fire rock
bossImage.src = "boss.png";

var boss = {
  x: 200,
  y: -125,
  img: bossImage,
  width: 259,
  height: 125,
  speed: 5
};

//Adds a rock to the array of rocks
for (var i = 0; i < totalRocks; i++) {
    var rock = {
        width: rockWidth,
        height: rockHeight,
        y: -100,
        img: rockImage,
        flipImg: false
    };
    if (i % 2 === 0)
      rock.flipImg = true;

    resetRock(rock);
    rocks.push(rock);
}

//Arrow key variables
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

//Places a rock at a random position at the top of the screen,
//falling at a random speed. Color and size/shape are based on
//clock time
function resetRock(rock) {
  if (clock <= 20) {
    rock.x = Math.random() * (canvas.width - rockWidth);
    rock.y = -100 - Math.random() * 40;
    rock.speed = 1.5 + Math.random() * 1.5;
    rock.width = rockWidth;
    rock.height = rockHeight;
    rock.img.src = "rocks.png";
  }
  else if (clock <= 40) {
    rock.width = 35;
    rock.height = 70;
    rock.x = Math.random() * (canvas.width - rockWidth);
    rock.y = -300 - Math.random() * 30;
    rock.speed = 2 + Math.random() * 2;
    rock.img.src = "stal.png";
  }
  else if (clock <= 60) {
    rock.width = 43;
    rock.height = 50;
    rock.x = Math.random() * (canvas.width - rockWidth);
    rock.y = -200 - Math.random() * 40;
    rock.speed = 1.5 + Math.random() * 1.7;
    rock.img.src = "snow.png";
  }
  else {
    rock.width = 30;
    rock.height = 56;
    rock.x = Math.random() * (canvas.width - rockWidth);
    rock.y = -200 - Math.random() * 40;
    rock.speed = 3 + Math.random() * 3;
    rock.img.src = "fire1.png";
    console.log("in reset!")
    }
}

function resetBoss (){
  boss.x = Math.random() * (canvas.width - boss.width);
  boss.y = -200 - Math.random() * 40;
}
//Runs each rock in rocks array through resetRock()
function resetRocks() {
  for (var i = 0; i <rocks.length; i++) {
    resetRock(rocks[i]);
  }
}

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
  ctx.drawImage(player.img, player.x, player.y, player.width, player.height);
}

//Level 1 rocks are sprites
function drawRocks () {
  for (var i = 0; i < rocks.length; i++) {
        var rock = rocks[i];
        ctx.drawImage(rockImage, 0, 0, 256, 256, rock.x, rock.y, rock.width, rock.height);
    }
}

//Level 2 rocks are black
function drawRocks2 () {
  for (var i = 0; i < rocks.length; i++) {
    var rock = rocks[i];
    if (rock.flipImg === false)
      ctx.drawImage(rockImage, 0, 0, 45, 90, rock.x, rock.y, rock.width, rock.height);
    else
      ctx.drawImage(rockImage2, 0, 0, 45, 90, rock.x, rock.y, rock.width, rock.height);
  }
}

//Level 3 rocks are white
function drawRocks3 () {
  for (var i = 0; i < rocks.length; i++) {
        var rock = rocks[i];
        ctx.drawImage(rockImage, 0, 0, 20, 19, rock.x, rock.y, rock.width, rock.height);
    }
}

function drawRocks4 () {
  for (var i = 0; i < rocks.length; i++) {
    var rock = rocks[i];
    if (rock.flipImg === false) {
      console.log("drawing fire1");
      ctx.drawImage(rockImage, 0, 0, 45, 90, rock.x, rock.y, rock.width, rock.height);
    }
    else {
      console.log("drawing fire2")
      ctx.drawImage(rockImage3, 0, 0, 45, 90, rock.x, rock.y, rock.width, rock.height);
    }
  }
}

function drawBoss () {
  ctx.drawImage(bossImage, 0, 0, 259, 125, boss.x, boss.y, boss.width, boss.height);

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

  if(newGame) {
    resetRocks();
    newGame = false;
  }

  for (var i = 0; i < rocks.length; i++) {
    var rock = rocks[i];

      //Tests for rock-block collision
      if (isColliding(rock, player)) {
        lives--;
        resetRock(rock);//Stops them from continuing to collide
      }

      //Advances the rocks
      rock.y += rock.speed;

      //If the rock is below the canvas
      if (rock.y > canvas.height) {
        resetRock(rock);
      }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);


if (clock >= 19) {
    preShake();
    drawPlayer();
    drawRocks();
    postShake();
  } else {
    drawPlayer();
    drawRocks();
    if (clock < 1)
      drawLevel();
  }

}

//Draws level 2
function level2 () {

  //if (flag2) {
  //  resetRocks();
  //  flag2 = false;
  //}

  //Reset player to initial starting position and increment level #
  if (level === 1) {
    player.x = (canvas.width-playerWidth)/2;
    player.y = canvas.height-playerHeight;
    level++;
  }

  //Change background to new level
  document.getElementById("myCanvas").style.background = "url('http://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/335550/06beefca8fcadd4479239bdee65630dcacd084fc.jpg')";

  for (var i = 0; i < rocks.length; i++) {
    var rock = rocks[i];

    // test for rock-block collision
    if (isColliding(rock, player)) {
      lives--;
      resetRock(rock);//Stops them from continuing to collide
    }

    // advance the rocks
    rock.y += rock.speed;

    // if the rock is below the canvas,
    if (rock.y > canvas.height) {
      resetRock(rock);
    }
  }
  if (clock === 21 && level1Reset) {
    for (var j = 0; j < rocks.length; j++) {
      resetRock(rocks[j]);
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
    if (clock < 22)
      drawLevel();
  }
}

//Draws level three
function level3 () {

  //Reset player to initial starting position and increment level #
  if (level === 2) {
    player.x = (canvas.width-playerWidth)/2;
    player.y = canvas.height-playerHeight;
    level++;
  }

  document.getElementById("myCanvas").style.background = "url('https://annalouiseyoungs.files.wordpress.com/2013/11/snowscene.png')";
  for (var i = 0; i < rocks.length; i++) {
    var rock = rocks[i];

      // test for rock-block collision
      if (isColliding(rock, player)) {
        lives--;
        resetRock(rock);//Stops them from continuing to collide
      }

      // advance the rocks
      rock.y += rock.speed;

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
    if (clock < 42)
     drawLevel();
  }
}
//Draws level four
function level4 () {

  //Reset player to initial starting position and increment level #
  if (level === 3) {
    player.x = (canvas.width-playerWidth)/2;
    player.y = canvas.height-playerHeight;
    level++;
  }

  document.getElementById("myCanvas").style.background = "url('https://s-media-cache-ak0.pinimg.com/originals/47/0d/67/470d677d06f32921b191ab560f9a24cb.gif')";

  for (var i = 0; i < rocks.length; i++) {
    var rock = rocks[i];

      // test for rock-block collision
      if (isColliding(rock, player)) {
        lives--;
        resetRock(rock);//Stops them from continuing to collide
      }

      // advance the rocks
      rock.y += rock.speed;

      // if the rock is below the canvas,
      if (rock.y > canvas.height) {
          resetRock(rock);
      }
      else if (level1Bonus)
        resetRock(rock);

  }

  if (clock >= 87) {
    // test for rock-boss collision
    if (isColliding(boss, player)) {
      lives--;
      resetBoss();//Stops them from continuing to collide
    }

    //Advance the boss
    boss.y += boss.speed;

    if (boss.y > canvas.height)
      resetBoss();
  }

  if (clock === 61 && level3Reset) {
    for (var j = 0; j < rocks.length; j++) {
      var rock = rocks[j];
      resetRock(rock);
    }
    level3Reset = false;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Shake the screen for three clock ticks when level is entered
  if (clock > 82 && clock < 87) {
    preShake();
    drawPlayer();
    drawRocks4();
    postShake();
  } else {
    drawPlayer();
    drawRocks4();
    console.log("here!");
    if (clock < 62) {
      drawLevel();
    }
    if (clock >= 87) {
      drawBoss();
    }
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
      resetRocks();
      level1Bonus = false;
    }
      level2();
  } else if (clock < 61) {
    if (level2Bonus) {
      score += 100;
      resetRocks();
      level2Bonus = false;
    }
    level3();
  } else {
    if (level3Bonus) {
      score += 100;
      resetRocks();
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
    return !((b.x + 8) > a.x + a.width || b.x + b.width < (a.x + 8) || (b.y + 18) > a.y + a.height || b.y + b.height < (a.y + 18));
}

//Draws the score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+ score, 8, 20);
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
  ctx.font = "60px Georgia";
  ctx.fillStyle = "black";
  ctx.fillText("Level " + level, canvas.width/3,canvas.height/2);
}

//Increments the score and clock every second
function tick() {
  score += 2;
  clock += 1;
}

function endGame() {
  gameOn = false;
  $("#myCanvas").hide();
  $("#score").text(score);
  $(".finishScreen").show();
}

function gameInit() {
  if (timer !== 0)
    clearInterval(timer);

  flag2 = true;
  level1Bonus = true;
  level2Bonus = true;
  level3Bonus = true;
  level1Reset = true;
  level2Reset = true;
  level3Reset = true;
  score = 0;
  clock = 0;
  lives = 10;
  level = 1;
  resetRocks();
  player.x = (canvas.width-playerWidth)/2;
  player.y = canvas.height-playerHeight;
}


