class Pawn extends MyObject {
  constructor(x, y, color) {
    if (color === "white") {
      var imagePath = "../images/pawnw.png";
    } else {
      var imagePath = "../images/pawnb.png";
    }
    super(x, y, 30, 45, color, imagePath);
  }
  checkMove(newpos, board) {
    this.currentBox = this.checkCurrentPos(this.x, this.y, board);
    console.log(this.currentBox);
    console.log(newpos);

    var newbox = newpos;
    if (this.color === "black") {
      if (
        abs(newbox[1] - this.currentBox[1]) == 0 &&
        newbox[0] - this.currentBox[0] == -1
      ) {
        console.log("straight move");
        if (this.isBlocked(newpos, board) == false) {
          console.log("true")
          return true;
        } else {
          console.log("false")

          return false;
        }
      } else if (
        abs(newbox[1] - this.currentBox[1]) == 1 &&
        newbox[0] - this.currentBox[0] == -1
      ) {
        console.log("diag move");

        if (this.isBlocked(newpos, board) == "opponent") {
          return true;
        } else {
          return false;
        }
      }
    } else if (this.color === "white") {
      if (
        abs(newbox[1] - this.currentBox[1]) == 0 &&
        newbox[0] - this.currentBox[0] == 1
      ) {
        console.log("straight move");

        if (this.isBlocked(newpos, board) == false) {
          console.log("true")

          return true;
        } else {
          console.log("false")

          return false;
        }
      } else if (
        abs(newbox[1] - this.currentBox[1]) == 1 &&
        newbox[0] - this.currentBox[0] == 1
      ) {
        console.log("diag move");

        if (this.isBlocked(newpos, board) == "opponent") {
          return true;
        } else {
          return false;
        }
      }
    }
  }
}
