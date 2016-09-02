export function draw(game) {
    game.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    game.cells.forEach((row, x) => {
        row.forEach((cell, y) => {
            game.context.beginPath();
            game.context.arc(x * game.boxSize + game.baseOffset, y * game.boxSize + game.baseOffset, game.circleSize,game.circleStartAngle,game.circleEndAngle);
            if (cell) {
              game.context.fillStyle = game.activeFillColor;
              game.context.fill();
                
            }
        });
    });
}

export function drawBackground(game) {
    game.bgContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
    game.cells.forEach((row, x) => {
        row.forEach((cell, y) => {
            game.bgContext.beginPath();
            game.bgContext.arc(x * game.boxSize + game.baseOffset, y * game.boxSize + game.baseOffset, game.circleSize,game.circleStartAngle,game.circleEndAngle);
              game.bgContext.fillStyle = game.bgFillColor;
              game.bgContext.fill();
        });
    });
}


export function drawBaseShape(game) {

    var isWidthOdd = 0;
    var isHeightOdd = 0;
    var shape;

    for (var key in game.arrayOfShapes)
    {
        if (game.arrayOfShapes[key].bounds[0] < game.nbSquareInWidth
            && game.arrayOfShapes[key].bounds[1] < game.nbSquareInHeight)
        {
            shape = game.arrayOfShapes[key];
            break;
        }
    }

    // xor operator
    // if nbCellWidth xor nbShapeCellWidth are odd
    if (game.nbSquareInWidth % 2 == 1
        && shape.bounds[0] % 2 != 1
        || shape.bounds[0] % 2 == 1
        && game.nbSquareInWidth % 2 != 1)
        isWidthOdd = 1;
    if (game.nbSquareInHeight % 2 == 1
        && shape.bounds[1] % 2 != 1 
        || shape.bounds[1] % 2 == 1
        && game.nbSquareInHeight % 2 != 1)
        isHeightOdd = 1;

    //console.log("odd", isWidthOdd, isHeightOdd);

    var offsetX = parseInt((game.nbSquareInWidth - shape.bounds[0]) / 2) + isWidthOdd;
    var offsetY = parseInt((game.nbSquareInHeight - shape.bounds[1]) / 2) + isHeightOdd;
    
    for (let i=0; i<shape.data.length; i++) {
        for (let j=0; j<shape.data[i].length; j++) {
            var x = offsetX + i;
            var y = offsetY + j;
            if(shape.data[i][j] == 1)
                game.cells[x][y] = 1;
        }
    }

    //console.log(JSON.stringify(activeForm));
}