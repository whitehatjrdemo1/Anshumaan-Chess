class Form {
  constructor() {
    this.input = createInput("Name");
    this.button = createButton("Play");
    this.greeting = createElement("h2");
    this.title = createElement("h2");
    this.reset = createButton("Reset");
    //this.radio = createRadio();

    // this.ele = createElement("h3");
  }
  hide() {
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display() {
    this.title.html("Chess");
    this.title.position(width / 2 - 50, 0);

    this.input.position(width / 2 - 40, height / 2 - 80);
    this.button.position(width / 2 + 30, (height * 2) / 3);
    this.reset.position(width - 100, 20);

    var colourArray = ["black", "white"];
    this.button.mousePressed(() => {
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount += 1;
      player.index = playerCount;
      console.log(player);
      if (player.index === 1) {
        player.color = "white";
      } else if (player.index === 2) {
        player.color = "black";
      }
      for (var i = 0; i < 8; i++) {
        // console.log(i);
        if (player.index === 2) {
          player.pegs[i].x = board[1][i].x;
          player.pegs[i].y = board[1][i].y;
          player.pegs[i].color = "black";

          player.pegs[i + 8].x = board[0][i].x;
          player.pegs[i + 8].y = board[0][i].y;
          player.pegs[i + 8].color = "black";
        } else if (player.index === 1) {
          player.pegs[i].x = board[6][i].x;
          player.pegs[i].y = board[6][i].y;
          player.pegs[i].color = "white";

          player.pegs[i + 8].x = board[7][i].x;
          player.pegs[i + 8].y = board[7][i].y;
          player.pegs[i + 8].color = "white";
        }
      }
      player.update();
      player.updateCount(playerCount);

      this.greeting.html("Hello " + player.name);
      this.greeting.position(width / 2 - 70, height / 4);
    });

    this.reset.mousePressed(() => {
      player.updateCount(0);
      //gameState = 2;
      game.update(0);
      game.updateTurn(1);
      db.ref("players").remove();
    });
  }
}
