class Queen extends BaseSprite {
  constructor(x, y, color) {
    if (color === "white") {
      var imagePath = null;
    } else if (color === "black") {
      var imagePath = null;
    }
    super(x, y, 20, 30,  color,imagePath);

    //this.moveAllowedXY = { x: 1, y: 1 };
  }

  checkMove(newPosition, board) {
    this.currentBox = this.checkCurrentPosition(this.x, this.y, board);
    

    var newBox = newPosition

    if (newBox) {
      return true;
    } else {
      return false;
    }
  }
}
