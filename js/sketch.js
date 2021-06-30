var canvas, backgroundImage;
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
var players = [];
var playState = "wait";
var selectedpeg = "";
var selectedpos = "";
var playerTurn = 0;
function preload() {}

function setup() {
  canvas = createCanvas(1000, 1000);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  if (playerCount === 2 && gameState === 0) {
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
    if (player.pegs[i].isClicked() && playState === "selectpeg") {
      selectedpeg = player.pegs[i];
      console.log("peg selected")
      playState = "selectmove";
    }
  }
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (
        !(board[i][j].x === selectedpeg.x && board[i][j].y === selectedpeg.y) &&
        board[i][j].isClicked() &&
        playState === "selectmove"
      ) {
        selectedpos = [i, j];
        playState = "play";
      console.log("move selected")

        game.play();
      }
    }
  }
}
