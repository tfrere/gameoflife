export function resize(game) {
  game.bgCanvas.width = game.canvas.width = window.innerWidth;
  game.bgCanvas.height = game.canvas.height = window.innerHeight;
  game.init(game);
}