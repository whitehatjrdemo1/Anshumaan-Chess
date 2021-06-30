class Bishop extends MyObject {
  constructor(x, y, color) {
    if (color === "white") {
      var imagePath = "../images/bishopw.png";
    } else {
      var imagePath = "../images/bishopb.png";
    }
    super(x, y, 30, 45, color, imagePath);
  }
  checkMove(newpos, board) {
    this.currentBox = this.checkCurrentPos(this.x, this.y, board);
    var newbox = newpos;
    if (
      abs(newbox[0] - this.currentBox[0]) == abs(newbox[1] - this.currentBox[1])
    ) {
      return true;
    } else {
      return false;
    }
  }
}
