export function update(game) {
    
    const result = [];
    
    /**
     * Return amount of alive neighbours for a cell
     */
    function _countNeighbours(x, y) {
        let amount = 0;
        
        function _isFilled(x, y) {
            return game.cells[x] && game.cells[x][y];
        }
        
        if (_isFilled(x-1, y-1)) amount++;
        if (_isFilled(x,   y-1)) amount++;
        if (_isFilled(x+1, y-1)) amount++;
        if (_isFilled(x-1, y  )) amount++;
        if (_isFilled(x+1, y  )) amount++;
        if (_isFilled(x-1, y+1)) amount++;
        if (_isFilled(x,   y+1)) amount++;
        if (_isFilled(x+1, y+1)) amount++;
        
        return amount;
    }
    
    game.cells.forEach((row, x) => {
        result[x] = [];
        row.forEach((cell, y) => {
            let alive = 0;
            const count = _countNeighbours(x, y);

            if (cell > 0) {
                alive = count === 2 || count === 3 ? 1 : 0;
            } else {
                alive = count === 3 ? 1 : 0;
            }

            result[x][y] = alive;
        });
    });
    
    game.cells = result;

}