class MyObject {
  constructor(x, y, width, height, color, imagePath) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    if (imagePath) {
      this.image = loadImage(imagePath);
    }
    this.color = color;
    this.active = true;
    this.currentBox = [];
  }
  display() {
    if (this.active) {
      if (this.image) {
        push();
        imageMode(CENTER);
        image(this.image, this.x, this.y, this.width, this.height);
        pop();
      } else {
        push();
        stroke("#CFA76E");
        strokeWeight(3);
        fill(this.color);
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);
        pop();
      }
    }
  }
  isBlocked(newpos, board) {
    var m = newpos[0];
    var n = newpos[1];
    for (var i = 0; i < players.length; i++) {
      for (var j = 0; j < players[i].length; j++) {
        console.log(players[i][j].x + "," + players[i][j].y);
        console.log(board[m][n].x + "," + board[m][n].x);
        if (
          players[i][j].x == board[m][n].x &&
          players[i][j].y == board[m][n].y
        ) {
          console.log("blocked");
          if (i+1!=player.index) {
            console.log("opp");

            return "opponent";
          } else {
            console.log("player");

            return "player";
          }
        }
      }
    }
    console.log("false");

    return false;
  }

  checkPath(arr2, arr3) {
    var i = this.currentBox[0];
    var j = this.currentBox[1];
    var a = arr2[0];
    var b = arr2[1];
    var k = arr3[0];
    var l = arr3[1];
    console.log(arr2);
    console.log(arr3);

    var dl = l - b;
    var dk = k - a;
    var dj = j - b;
    var di = i - a;

    console.log(dk + "," + dl + "," + di + "," + dj);
    if (dl === 0) {
      console.log("y");
      if (a < i && j < k) {
        return false;
      } else return true;
    } else if (dk === 0) {
      console.log("x");

      if (b < j && j < l) {
        return false;
      } else return true;
    } else if (abs(dk) === abs(dl)) {
      if (dk / abs(dk) === di / abs(di) && dl / abs(dl) === dj / abs(dj)) {
        if (abs(di) < abs(dk) && abs(dj) < abs(dl)) {
          return false;
        } else return true;
      } else return true;
    }
    return true;
  }
  checkCurrentPos(x, y, board) {
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (x === board[i][j].x && y === board[i][j].y) {
          var currentBox = [1, j];
          return [i, j];
        }
      }
    }
    return false;
  }
  isClicked() {
    if (
      this.x + this.width / 2 > mouseX &&
      this.x - this.width / 2 < mouseX &&
      this.y + this.height / 2 > mouseY &&
      this.y - this.height / 2 < mouseY
    ) {
      return true;
    } else {
      return false;
    }
  }
  movePeg(pos, board) {
    this.x = board[pos[0]][pos[1]].x;
    this.y = board[pos[0]][pos[1]].y;
  }
}
