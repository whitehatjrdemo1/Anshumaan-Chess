class Knight extends MyObject {
  constructor(x, y, color) {
    if (color === "white") {
      var imagePath = "../images/knightw.png";
    } else {
      var imagePath = "../images/knightb.png";
    }
    super(x, y, 30, 45, color, imagePath);
  }
  checkMove(newpos, board) {
    this.currentBox = this.checkCurrentPos(this.x, this.y, board);
    var newbox = newpos;
    if (
      abs(newbox[0] - this.currentBox[0]) == 2 &&
      abs(newbox[1] - this.currentBox[1]) == 1
    ) {
      this.x = newbox[0];
      this.y = newbox[1];
      return true;
    } else if (
      abs(newbox[0] - this.currentBox[0]) == 1 &&
      abs(newbox[1] - this.currentBox[1]) == 2
    ) {
      return true;
    } else {
      return false;
    }
  }
  checkPath(arr2, arr3) {
    return true;
  }
}
