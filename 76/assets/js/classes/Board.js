class Board {
  constructor()  {
    this.background = color(data.board.colors.background);
    this.colors = data.board.colors;
    this.cells = [];
    this.scale = data.board.scale;
    this.dragging = false;
  }
}