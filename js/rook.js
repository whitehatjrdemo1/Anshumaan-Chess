class Rook extends BaseSprite {
  constructor(x, y, color) {
    if (color === "white") {
      var imagePath = "../images/rook-white.png";
    } else if (color === "black") {
      var imagePath = "../images/rook-black.png";
    }
    super(x, y, 20, 30, color, imagePath);
    //this.moveAllowedXY = { x: 1, y: 1 };
  }

  checkMove(newPosition, board) {
    this.currentBox = this.checkCurrentPosition(this.x, this.y, board);

    var newBox = newPosition;

    if (
      abs(newBox[0] === this.currentBox[0]) ||
      abs(newBox[1] === this.currentBox[1])
    ) {
      return true;
    } else {
      return false;
    }
  }
}
