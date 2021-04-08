var canvas, backgroundImage;
//diceroll everytime num is 6 roll again if total num is 18 then num is =6
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var playerColor = "";
var turn = 1;
var form, player, game;
var path = [];
var board = [];
var boxes = [];
var dice1, dice2, dice3, dice4, dice5, dice6;
var players = [];
var homeSprite;
var track, car1_img, car2_img, car3_img, car4_img;
var playState = "wait";
var lastRoll = 0;
var selectedpeg = "";
var selectedpos = "";

function setup() {
  canvas = createCanvas(450, 500);
  database = firebase.database();
  game = new Game();

  game.getState();
  game.start();
  //green
}

function draw() {
  background(126);

  if (playerCount === 2 && gameState == 0) {
    game.update(1);
  }
  if (gameState === 1) {
    clear();
    game.play();
  }
  if (gameState === 2) {
    game.end();
  }
}

function mouseClicked() {
  for (var i = 0; i < player.pegs.length; i++) {
    console.log(player.pegs[i].isClicked());
    if (player.pegs[i].isClicked() && playState === "selectpeg") {
      console.log("peg selected");
      selectedpeg = player.pegs[i];
      playState = "selectmove";
      console.log(selectedpeg + ", " + i);
      console.log(playState);
    }
  }
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      //console.log(board[i][j].isClicked())
      //console.log(board[i][j])
      if (
        board[i][j].isClicked() &&
        playState === "selectmove" &&
        !(board[i][j].x === selectedpeg.x && board[i][j].y === selectedpeg.y)
      ) {
        console.log(board[i][j]);

        selectedpos = [i, j];
        playState = "play";

        console.log(playState);

        //console.log(selectedpos + ", " + i + "," + j);
        game.play();
      }
    }
  }

  console.log(playState);
}
