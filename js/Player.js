class Player {
  constructor() {
    this.index = null;
    this.name = null;
    // var color = this.color

    var p01 = new Pawn(375, 375, 'white');
    var p02 = new Pawn(375, 375, 'white');
    var p03 = new Pawn(375, 375, 'white');
    var p04 = new Pawn(375, 375, 'white');
    var p05 = new Pawn(375, 375, 'white');
    var p06 = new Pawn(375, 375, 'white');
    var p07 = new Pawn(375, 375, 'white');
    var p08 = new Pawn(375, 375, 'white');
    var r01 = new Rook(375, 375, 'white');
    var b01 = new Bishop(375, 375, 'white');
    var kn01 = new Knight(375, 375, 'white');
    var q0 = new Queen(375, 375, 'white');
    var k0 = new King(375, 375, 'white');

    var kn02 = new Knight(375, 375, 'white');
    var b02 = new Bishop(375, 375, 'white');

    var r02 = new Rook(375, 375, 'white');
    this.pegs = [
      p01,
      p02,
      p03,
      p04,
      p05,
      p06,
      p07,
      p08,
      r01,
      b01,
      kn01,
      q0,
      k0,
      kn02,
      b02,
      r02,
    ];
  }

  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", (data) => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    database.ref("/").update({
      playerCount: count,
    });
  }

  update() {
    var pegs = [];

    for (var i = 0; i < this.pegs.length; i++) {
      pegs.push([this.pegs[i].x, this.pegs[i].y, true]);
    }
   // console.log(pegs);
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      name: this.name,
      color: this.color,
      pegs: pegs,
    });
  }
  otherUpdate(i, j) {
    var playerIndex = "players/player" + i + "/pegs/" + j;
    database.ref(playerIndex).update({
      2: false,
    });
  }
  static getPlayerInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", (data) => {
      allPlayers = data.val();
      // console.log(allPlayers);
    });
  }
  getPlayerAtEnd() {
    database.ref("carsAtEnd").on("value", (data) => {
      this.rank = data.val();
    });
  }
  static updatePlayerAtEnd(rank) {
    database.ref("/").update({
      carsAtEnd: rank,
    });
  }
}
