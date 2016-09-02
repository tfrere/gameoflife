
export function mousedown(game) {
    game.isMouseDown = 1;
    if (!game.drawMode)
    	game.pause();
}

export function mouseup(game) {
    game.isMouseDown = -1;
    if (!game.drawMode)
    	game.play();
}

export function drawCell(game, event) {
      event = game.getMousePosition(event);
      if (game.isMouseDown == 1) {
          var x = parseInt( (event.pageX - game.elemLeft) / ( game.boxSize ));
          var y = parseInt( (event.pageY - game.elemTop) / ( game.boxSize ));
          game.cells[x][y] = 1;
          //game.cells[x][y] = game.cells[x][y] ? 0 : 1;
          game.draw(game);
      }
	if (game.drawMode == true)
		console.log(JSON.stringify(game.cells));

}