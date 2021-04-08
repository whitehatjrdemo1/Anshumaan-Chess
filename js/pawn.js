class Pawn extends BaseSprite {
  constructor(x, y, color) {
    if (color === "white") {
      var imagePath = "../images/pawn-white.png";
    } else if (color === "black") {
      var imagePath = "../images/pawn-black.png";
    }
    super(x, y, 20, 30, color, imagePath);
    //this.moveAllowedXY = { x: 1, y: 1 };
  }
  isBlocked(newPosition, board) {
    for (var i = 0; i < players.length; i++) {
      for (var j = 0; j < players[i].length; j++) {
        if (
          i != player.index &&
          players[i][j].x === board[(newPosition[0], newPosition[1])].x &&
          players[i][j].y === board[(newPosition[0], newPosition[1])].y
        ) {
          console.log("blocked");

          return true;
        }
      }
    }
    console.log("not blocked");

    return false;
  }
  checkMove(newPosition, board) {
    this.currentBox = this.checkCurrentPosition(this.x, this.y, board);

    console.log(this.currentBox);
    console.log(newPosition);
    var newBox = newPosition;

    if (this.color === "white") {
      if (
        abs(newBox[1] - this.currentBox[1]) === 0 &&
        newBox[0] - this.currentBox[0] === -1
      ) {
        console.log("1 box ahead move");

        if (!this.isBlocked(newPosition, board)) {
          return true;
        } else return false;
      } else if (
        abs(newBox[1] - this.currentBox[1]) === 1 &&
        newBox[0] - this.currentBox[0] === -1
      ) {
        console.log("1 box diag move");

        if (!this.isBlocked(newPosition, board)) {
          return false;
        } else {
          return true;
        }
      }
    } else if (this.color === "black") {
      if (
        abs(newBox[1] - this.currentBox[1]) === 0 &&
        newBox[0] - this.currentBox[0] === 1
      ) {
        console.log("1 box ahead move");

        if (!this.isBlocked(newPosition, board)) {
          return true;
        } else return false;
      } else if (
        abs(newBox[1] - this.currentBox[1]) === 1 &&
        newBox[0] - this.currentBox[0] === 1
      ) {
        console.log("1 box diag move");

        if (!this.isBlocked(newPosition, board)) {
          return false;
        } else {
          return true;
        }
      }
    }
  }
}
