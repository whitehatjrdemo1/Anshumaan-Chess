class Knight extends BaseSprite {
  constructor(x, y, color) {
    if (color === "white") {
      var imagePath = "../images/knight-white.png";
    } else if (color === "black") {
      var imagePath = "../images/knight-black.png";
    }
    super(x, y, 20, 30, color, imagePath);
    //this.moveAllowedXY = { x: 1, y: 1 };
  }
  checkPath(arr2, arr3) {}
  checkPosition(newPosition, board) {
    return true;
  }
  checkMove(newPosition, board) {
    this.currentBox = this.checkCurrentPosition(this.x, this.y, board);
    

    var newBox = newPosition

    if (
      abs(newBox[0] - this.currentBox[0]) === 2 &&
      abs(newBox[1] - this.currentBox[1]) === 1
    ) {
      this.x = newBox[0];
      this.y = newBox[1];
      return true;
    } else if (
      abs(newBox[0] - this.currentBox[0]) === 1 &&
      abs(newBox[1] - this.currentBox[1]) === 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}
