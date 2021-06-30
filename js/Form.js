class Form {
  constructor() {
    this.input = createInput("Name");
    this.button = createButton("Play");
    this.reset = createButton("Reset");
    this.greeting = createElement("h2");
    this.title = createElement("h2");
  }
  hide() {
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display() {
    this.title.html("Car Racing Game");
    this.title.position(displayWidth / 2 - 50, 0);
    this.reset.position(displayWidth - 100, 20);
    this.input.position(displayWidth / 2 - 40, displayHeight / 2 - 80);
    this.button.position(displayWidth / 2 + 30, displayHeight / 2);

    this.button.mousePressed(() => {
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount += 1;
      player.index = playerCount;
      if (player.index === 1) {
        player.color = "white";
      } else {
        player.color = "black";
      }
      for (var i = 0; i < 8; i++) {
        if (player.index === 1) {
          player.pegs[i].x = board[1][i].x;
          player.pegs[i].y = board[1][i].y;
          player.pegs[i].color = "white";
          player.pegs[i + 8].x = board[0][i].x;
          player.pegs[i + 8].y = board[0][i].y;
          player.pegs[i + 8].color = "white";
        } else if (player.index === 2) {
          player.pegs[i].x = board[6][i].x;
          player.pegs[i].y = board[6][i].y;
          player.pegs[i].color = "black";
          player.pegs[i + 8].x = board[7][i].x;
          player.pegs[i + 8].y = board[7][i].y;
          player.pegs[i + 8].color = "black";
        }
      }
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name);
      this.greeting.position(displayWidth / 2 - 70, displayHeight / 4);
    });
    this.reset.mousePressed(() => {
      player.updateCount(0);
      game.update(0);
      database.ref("/players").remove();
      game.updateTurn(1);
    });
  }
}
