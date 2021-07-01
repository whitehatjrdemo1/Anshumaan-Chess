class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state,
    });
  }
  getTurn() {
    var gameStateRef = database.ref("playerTurn");
    gameStateRef.on("value", function (data) {
      turn = data.val();
    });
  }
  updateTurn(turn) {
    database.ref("/").update({
      playerTurn: turn,
    });
  }
  async start() {
    if (gameState === 0) {
      this.createBoard();
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }
    var k1 = new King(375, 375, "white");
    var k2 = new King(375, 375, "black");
    var q1 = new Queen(0, 0, "white");
    var q2 = new Queen(0, 0, "black");
    var b11 = new Bishop(0, 0, "white");
    var b12 = new Bishop(0, 0, "white");
    var b21 = new Bishop(0, 0, "black");
    var b22 = new Bishop(0, 0, "black");
    var kn11 = new Knight(0, 0, "white");
    var kn12 = new Knight(0, 0, "white");
    var kn21 = new Knight(0, 0, "black");
    var kn22 = new Knight(0, 0, "black");
    var r11 = new Rook(0, 0, "white");
    var r12 = new Rook(0, 0, "white");
    var r21 = new Rook(0, 0, "black");
    var r22 = new Rook(0, 0, "black");
    var p11 = new Pawn(0, 0, "white");
    var p12 = new Pawn(0, 0, "white");
    var p13 = new Pawn(0, 0, "white");
    var p14 = new Pawn(0, 0, "white");
    var p15 = new Pawn(0, 0, "white");
    var p16 = new Pawn(0, 0, "white");
    var p17 = new Pawn(0, 0, "white");
    var p18 = new Pawn(0, 0, "white");
    var p21 = new Pawn(0, 0, "black");
    var p22 = new Pawn(0, 0, "black");
    var p23 = new Pawn(0, 0, "black");
    var p24 = new Pawn(0, 0, "black");
    var p25 = new Pawn(0, 0, "black");
    var p26 = new Pawn(0, 0, "black");
    var p27 = new Pawn(0, 0, "black");
    var p28 = new Pawn(0, 0, "black");
    players = [
      [
        p11,
        p12,
        p13,
        p14,
        p15,
        p16,
        p17,
        p18,
        r11,
        b11,
        kn11,
        q1,
        k1,
        kn12,
        b12,
        r12,
      ],
      [
        p21,
        p22,
        p23,
        p24,
        p25,
        p26,
        p27,
        p28,
        r21,
        b21,
        kn21,
        q2,
        k2,
        kn22,
        b22,
        r22,
      ],
    ];
    this.getTurn();
  }

  play() {
    form.hide();
    if (player) {
      background(player.color);
    } else {
      background(0);
    }
    fill("yellow");
    Player.getPlayerInfo();
    this.drawBoard();
    stroke(0);
    textSize(15);
    text(
      "You are playing player " + player.index + ", " + player.color,
      width / 2,
      height - 25
    );
    if (allPlayers !== undefined) {
      var index = 0;

      var x = 175;
      var y;

      for (var plr in allPlayers) {
        index = index + 1;
        y = y + 40;
        var plyrindex = "player" + turn;
        for (var i = 0; i < players[index - 1].length; i++) {
          players[index - 1][i].x = allPlayers[plr].pegs[i][0];
          players[index - 1][i].y = allPlayers[plr].pegs[i][1];
          players[index - 1][i].color = allPlayers[plr].color;
          players[index - 1][i].active = allPlayers[plr].pegs[i][2];
          if (!players[player.index-1][i].active) {
            player.pegs[i].active = allPlayers[plr].pegs[i][2];
            player.pegs[i].x = 0;
            player.pegs[i].y = 0;
            player.update();
          }
        }

        text(
          allPlayers[plyrindex].name +
            ", " +
            plyrindex +
            " is the active player",
          width / 2,
          height - 50
        );
        if (playState === "wait") {
          text(
            "waiting for" +
              allPlayers[plyrindex].name +
              ", " +
              plyrindex +
              " To Finish",
            width / 2,
            height - 35
          );
        } else if (playState === "selectpeg") {
          text("please select the peg", width / 2, height - 25);
        } else if (playState === "selectmove")
          if (index === player.index) {
            text("please make your move", width / 2, height - 35);
          } else if (playState === "pegtaken") {
            text("peg taken", width / 2, height - 35);
          }
      }
    }
    this.playerTurn();
    for (var i = 0; i < players.length; i++) {
      for (var j = 0; j < players[i].length; j++) {
        players[i][j].display();
      }
    }
  }
  playerTurn() {
    if (turn === player.index) {
      if (playState === "wait" || playState == "pegtaken") {
        playState = "selectpeg";
      }
      if (playState === "play") {
        if (selectedpeg.checkMove(selectedpos, board)) {
          console.log("move possible");

          if (selectedpeg.isBlocked(selectedpos, board) == "opponent") {
            console.log("other peg taken");
            for (var i = 0; i < players.length; i++) {
              for (var j = 0; j < players[i].length; j++) {
                if (
                  players[i][j].x === board[selectedpos[0]][selectedpos[1]].x &&
                  players[i][j].y === board[selectedpos[0]][selectedpos[1]].y
                ) {
                  selectedpeg.movePeg(selectedpos, board);
                  playState = "pegtaken";
                  player.otherUpdate(i + 1, j);

                  player.update();
                  if (turn === 2) {
                    turn = 1;
                  } else if (turn === 1) {
                    turn = 2;
                  }
                  this.updateTurn(turn);
                }
              }
            }
          } else if (selectedpeg.isBlocked(selectedpos, board) == "player") {
            playState = "selectpeg";
          } else if (
            selectedpeg.checkPath(
              selectedpeg.checkCurrentPos(selectedpeg.x, selectedpeg.y, board),
              selectedpos
            )
          ) {
            playState = "wait";
          } else {
            playState = "selectpeg";
          }

          if (playState === "wait") {
            selectedpeg.movePeg(selectedpos, board);
            player.update();

            console.log(turn);
            if (turn === 2) {
              turn = 1;
              console.log(turn);
            } else if (turn === 1) {
              turn = 2;
              console.log(turn);
            }
            this.updateTurn(turn);
          }
        } else {
          playState = "selectpeg";
        }
      }
    }
  }
  createBoard() {
    var k = 0;
    rectMode(CENTER);
    for (var j = 75; j < 675; j += 75) {
      boxes = [];
      for (var i = 75; i < 675; i += 75) {
        var box = new MyObject(i, j, 75, 75);
        boxes.push(box);
      }
      board.push(boxes);
    }
  }
  drawBoard() {
    rectMode(CENTER);
    var k = 0;
    for (var j = 0; j < board.length; j++) {
      k++;
      for (var i = 0; i < board[j].length; i++) {
        k++;
        if (k % 2 == 0) {
          board[j][i].color = "#763E2D";
        } else {
          board[j][i].color = "#DCBC89";
        }
        board[j][i].display();
      }
    }
  }
  end() {
    console.log("Game Ended");
  }
}
