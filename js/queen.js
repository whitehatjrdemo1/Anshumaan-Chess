class Queen extends MyObject {
  constructor(x, y, color) {
    if (color === "white") {
      var imagePath = "../images/queenw.png";
    } else {
      var imagePath = "../images/queenb.png";
    }
    super(x, y, 30, 45, color, imagePath);
  }
  checkMove(newpos, board) {
    this.currentBox = this.checkCurrentPos(this.x, this.y, board);
    var newbox = newpos;
    if (newbox) {
      return true;
    } else {
      return false;
    }
  }
}
