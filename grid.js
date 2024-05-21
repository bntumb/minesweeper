let gameOver = true;

class Grid {
    constructor(size) {
        this.size = size;
        this.grid = this.generateGrid(size);
    }

    generateGrid(size) {
        const mineDesity = 0.15;
        const grid = [];
        for (let row = 0; row < size; row++) {
            for (let column = 0; column < size; column++) {

                //Number of mines = Total number of squares×mine_density 
                //first place mines randomly 
                const value = Math.floor(Math.random() * 100); // Generate a random number between 0 and 99
                grid.push({ row, column, value });
            }
        }
        return grid;
    }

    getCell(row, column) {
        return this.grid[row * this.size + column];
    }

    printGrid() {
        const border = '+-----'.repeat(this.size) + '+' ;
        console.log(border);
        for (let row = 0; row < this.size; row++) {
            let rowString = '|';
            for (let column = 0; column < this.size; column++) {
                const cell = this.getCell(row, column);
                rowString += ` ${cell.value.toString().padStart(3)} |`;
            }
            console.log(rowString);
            console.log(border);
        }
    }
    
    
}

// Create a new instance of the Grid class with size 8x8
const gridInstance = new Grid(4);

// Print the grid
if (gameOver == true){
    gridInstance.printGrid();
}
