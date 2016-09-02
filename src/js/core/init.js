/*
 * Initialize game.
*/
export function init(game) {

    game.boxSize = game.circleSize + game.circleOffset;
    game.baseOffset = game.boxSize / 2;

    game.nbSquareInWidth = parseInt(canvas.width / game.boxSize);
    game.nbSquareInHeight = parseInt(canvas.height / game.boxSize);

    console.log("init game");
    console.log("sizeOfGame xy ", game.nbSquareInHeight, game.nbSquareInHeight);

	game.cells = [];

    for (let i=0; i<game.nbSquareInWidth; i++) {
        game.cells[i] = [];
        for (let j=0; j<game.nbSquareInHeight; j++) {
        	game.cells[i][j] = 0;
        }
    }
    if (!game.drawMode)
    	game.drawBaseShape(game);

    game.drawBackground(game);
    game.updateSvgFilter();
    game.update(game);
}
