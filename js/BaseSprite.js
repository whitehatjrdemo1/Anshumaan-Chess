class BaseSprite {
  constructor(x, y, width, height, color, imagePath) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.active = true;
    this.depth = 0;
    this.velocityX = 0;
    this.velocityY = 0;
    console.log(imagePath);
    if (imagePath) {
      this.image = loadImage(imagePath);
    }
    this.currentBox = [];
  }
  checkPath(arr2, arr3) {
    var i = this.currentBox[0];
    var j = this.currentBox[0];
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
  movePeg(pos, board) {
    console.log("move peg");

    this.x = board[pos[0]][pos[1]].x;
    this.y = board[pos[0]][pos[1]].y;

    console.log(this.x + "," + this.y);
  }
  checkPosition(newPosition, board) {
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (
          newPosition[0] === board[i][j][0] &&
          newPosition[1] === board[i][j][1]
        ) {
          var newBox = [i, j];
          return newBox;
        }
      }
    }
    return false;
  }
  checkCurrentPosition(x, y, board) {
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (x === board[i][j].x && y === board[i][j].y) {
          var currentBox = [i, j];
          console.log(currentBox);
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

  isTouching(object) {
    if (
      this.x - object.x < this.width / 2 + object.width / 2 &&
      object.x - this.x < this.width / 2 + object.width / 2 &&
      this.y - object.y < this.height / 2 + object.height / 2 &&
      object.y - this.y < this.height / 2 + object.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
  bounceOff(object) {
    if (
      this.x - object.x < this.width / 2 + object.width / 2 &&
      object.x - this.x < this.width / 2 + object.width / 2 &&
      this.y - object.y < this.height / 2 + object.height / 2 &&
      object.y - this.y < this.height / 2 + object.height / 2
    ) {
      this.velocityX = this.velocityX * -1;
      this.velocityY = this.velocityY * -1;
      object.velocityX = object.velocityX * -1;
      object.velocityY = object.velocityY * -1;
    } else {
      return false;
    }
  }
  bounce(object) {
    if (
      this.x - object.x < this.width / 2 + object.width / 2 &&
      object.x - this.x < this.width / 2 + object.width / 2 &&
      this.y - object.y < this.height / 2 + object.height / 2 &&
      object.y - this.y < this.height / 2 + object.height / 2
    ) {
      this.velocityX = this.velocityX * -1;
      this.velocityY = this.velocityY * -1;
      object.velocityX = object.velocityX * -1;
      object.velocityY = object.velocityY * -1;
    } else {
      return false;
    }
  }
  display() {
    //if (this.visible) {
    this.lifetime--;
    this.x += this.velocityX;
    this.y += this.velocityY;
    if (this.image) {
      push();
      imageMode(CENTER);

      image(this.image, this.x, this.y, this.width, this.height);
      pop();
    } else {
      push();
      translate(this.x, this.y);
      stroke("grey");
      strokeWeight(3);
      //console.log("'"+this.color+"'");
      fill(this.color);
      rectMode(CENTER);
      rect(0, 0, this.width, this.height);
      pop();
    }
    //  }
  }
}
