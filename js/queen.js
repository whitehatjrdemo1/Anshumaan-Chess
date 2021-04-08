class Queen extends BaseSprite {
  constructor(x, y, color) {
    if (color === "white") {
      var imagePath = "../images/queen-white.png";
    } else if (color === "black") {
      var imagePath = "../images/queen-black.png";
    }
    super(x, y, 20, 30, color, imagePath);

    //this.moveAllowedXY = { x: 1, y: 1 };
  }

  checkMove(newPosition, board) {
    this.currentBox = this.checkCurrentPosition(this.x, this.y, board);

    var newBox = newPosition;

    if (newBox) {
      return true;
    } else {
      return false;
    }
  }
}
