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
  getLastRoll() {
    var lastRollRef = database.ref("lastRoll");
    lastRollRef.on("value", function (data) {
      lastRoll = data.val();
    });
  }

  updateLastRoll(roll) {
    database.ref("/").update({
      lastRoll: roll,
    });
  }
  getTurn() {
    var turnRef = database.ref("turn");
    turnRef.on("value", function (data) {
      turn = data.val();
    });
  }

  updateTurn(turn) {
    database.ref("/").update({
      turn: turn,
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

    var p11 = new Pawn(375, 375, "white");
    var p12 = new Pawn(375, 375, "white");
    var p13 = new Pawn(375, 375, "white");
    var p14 = new Pawn(375, 375, "white");
    var p15 = new Pawn(375, 375, "white");
    var p16 = new Pawn(375, 375, "white");
    var p17 = new Pawn(375, 375, "white");
    var p18 = new Pawn(375, 375, "white");
    var r11 = new Rook(375, 375, "white");
    var b11 = new Bishop(375, 375, "white");
    var kn11 = new Knight(375, 375, "white");
    var q1 = new Queen(375, 375, "white");
    var k1 = new King(375, 375, "white");
    var r12 = new Rook(375, 375, "white");
    var b12 = new Bishop(375, 375, "white");
    var kn12 = new Knight(375, 375, "white");

    var p21 = new Pawn(375, 375, "black");
    var p22 = new Pawn(375, 375, "black");
    var p23 = new Pawn(375, 375, "black");
    var p24 = new Pawn(375, 375, "black");

    var p25 = new Pawn(375, 375, "black");
    var p26 = new Pawn(375, 375, "black");
    var p27 = new Pawn(375, 375, "black");
    var p28 = new Pawn(375, 375, "black");
    var r21 = new Rook(375, 375, "black");
    var b21 = new Bishop(375, 375, "black");
    var kn21 = new Knight(375, 375, "black");
    var q2 = new Queen(375, 375, "black");
    var k2 = new King(375, 375, "black");
    var r22 = new Rook(375, 375, "black");
    var b22 = new Bishop(375, 375, "black");
    var kn22 = new Knight(375, 375, "black");

    //players = [p1, p2, p3, p4];
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
    console.log(players);
    //console.log(board);
    this.getTurn();
  }

  play() {
    form.hide();
    background(player.color);
    Player.getPlayerInfo();
    player.getPlayerAtEnd();
    this.drawBoard();
    stroke(0);
    textSize(15);
    text(
      "You are playing Player" + player.index + ", " + player.color,
      width / 2,
      height - 25
    );
    var y = 400;
    if (allPlayers !== undefined) {
      var index = 0;

      for (var plr in allPlayers) {
        index = index + 1;
        y = y + 40;
        var plyrIndx = "player" + turn;

        for (var i = 0; i < players[index - 1].length; i++) {
          //var pegindex = "peg" + i;
          players[index - 1][i].x = allPlayers[plr].pegs[i][0];
          players[index - 1][i].y = allPlayers[plr].pegs[i][1];

          players[index - 1][i].color = allPlayers[plr].color;
          players[index - 1][i].active = allPlayers[plr].pegs[i][2];
        }
        text(
          allPlayers[plyrIndx].name + ", " + plyrIndx + " is the active player",
          width / 2,
          height - 50
        );
        // text("Last player rolled " + lastRoll, width / 2, height - 25);

        text(
          allPlayers[plr].name +
            " has finished " +
            allPlayers[plr].score +
            " pegs",
          width / 2,
          height - 25
        );
        if (playState === "wait") {
          fill(0);
          stroke(0);
          text(
            "Waiting for " +
              allPlayers[plyrIndx].name +
              ", " +
              plyrIndx +
              " to finish",
            width / 2,
            height - 35
          );
        } else if (playState === "selectpeg") {
          text("Please Select the Peg", width / 2, height - 25);
        } else if (playState === "selectmove") {
          text("Make Your Move", width / 2, height - 35);
        } else if (playState === "pegtaken") {
          text("Peg Taken", width / 2, height - 35);
        }
      }
    }

    this.playerTurn();
    for (var i = 0; i < players.length; i++) {
      for (var j = 0; j < players[i].length; j++) {
        //   console.log("display");

        players[i][j].display();
      }
    }
    // drawSprites();
    //move peg out of board if inactive
    for (var i = 0; i < player.pegs.length; i++) {
      if (player.pegs[i].active === false) {
        player.pegs[i].x = (player.index - 1) * 400;
        player.pegs[i].y = (player.index - 1) * 400;
      }
    }
    fill("black");
    text(mouseX + "," + mouseY, mouseX, mouseY);
  }

  playerTurn() {
    if (turn === player.index) {
      if (playState === "wait") {
        playState = "selectpeg";
      }
      if (playState === "play") {
        if (selectedpeg.checkMove(selectedpos, board)) {
          console.log(selectedpeg.checkMove(selectedpos, board));
          for (var i = 0; i < players.length; i++) {
            for (var j = 0; j < players[i].length; j++) {
              if (
                i != player.index &&
                players[i][j].x === board[selectedpos[0]][selectedpos[1]].x &&
                players[i][j].y === board[selectedpos[0]][selectedpos[1]].y
              ) {
                selectedpeg.movePeg(selectedpos, board);

                players[i][j].active = false;

                playState = "peg taken";
                player.otherUpdate(i, j);
                player.update();
                console.log("other player at destination");
              } else if (
                i === player.index &&
                players[i][j].x === board[selectedpos[0]][selectedpos[1]].x &&
                players[i][j].y === board[selectedpos[0]][selectedpos[1]].y
              ) {
                playState = "selectpeg";
                console.log("same player at destination");
              } else if (i === player.index) {
                if (selectedpeg.checkPath([i, j], selectedpos)) {
                  console.log(i + "," + j);
                  console.log(selectedpeg.checkPath([i, j], selectedpos));
                  playState = "wait";
                  console.log("check path blocked");
                } else playState = "selectpeg";
              } else playState = "wait";
            }
          }

          if (playState === "wait") {
            selectedpeg.movePeg(selectedpos, board);
            player.update();
          }
        }
      }

      if (playState === "peg taken" || playState === "wait") {
        if (turn === 2) {
          turn = 1;
        } else if (turn == 1) {
          turn = 2;
        }
        this.updateTurn(turn);
      }
    }
  }

  end() {
    console.log("Game Ended");
    console.log(player.score);
    if (allPlayers !== undefined) {
      var index = 0;

      for (var plr in allPlayers) {
        index = index + 1;

        var plyrIndx = "player" + turn;
        text(
          allPlayers[plyrIndx].name +
            ", " +
            plyrIndx +
            " has finished the game",
          800,
          400
        );
        var newButton = createButton("New Game");
        newButton.position(displayWidth / 2, 200);
        newButton.mousePressed(() => {
          player.updateCount(0);
          game.update(0);
          location.reload();
        });

        // for (var i = 0; i < ; i++) {
        //   var pegindex = "peg" + i;
        //   players[index - 1].x = allPlayers[plr][i].x;
        //   players[index - 1].y = allPlayers[plr][i].y;
        // }
      }
    }

    //this.playerTurn();
  }
  createBoard() {
    var k = 0;
    rectMode(CENTER);
    for (var j = 50; j < 450; j += 50) {
      boxes = [];

      for (var i = 50; i < 450; i += 50) {
        var box = new BaseSprite(i, j, 50, 50);

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
        if (k % 2 === 0) {
          board[j][i].color = 64;
        } else {
          board[j][i].color = 192;
        }

        board[j][i].display();
        // rect(board[j][i][0], board[j][i][1], 50, 50);
      }
    }
  }
}
