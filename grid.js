const prompt = require('prompt-sync')(); // Import prompt-sync module
const gridSize = 6;

const failed =   
`
██     ██  █████  ███████ ████████ ███████ ██████  
██     ██ ██   ██ ██         ██    ██      ██   ██
██  █  ██ ███████ ███████    ██    █████   ██   ██
██ ███ ██ ██   ██      ██    ██    ██      ██   ██
 ███ ███  ██   ██ ███████    ██    ███████ ███████
 `

class Grid {
    constructor(size) {
        this.size = size;
        this.grid = this.generateGrid(size);
    }

    generateGrid(size) {
        const mineDensity = 0.15;
        const cellCount = size * size;
        const mineCount = Math.ceil(cellCount * mineDensity);

        // Create an array with the required amount of mines and empty cells
        const values = Array(mineCount).fill(true).concat(Array(cellCount - mineCount).fill(false));

        this.shuffle(values); // Place the mines randomly in the array

        // Create the grid from the shuffled values
        const grid = [];
        for (let row = 0; row < size; row++) {
            for (let column = 0; column < size; column++) {
                const value = values.pop(); // Remove the last value and add it to the grid
                grid.push({ row, column, value });
            }
        }
        return grid;
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    getCell(row, column) {
        return this.grid[row * this.size + column];
    }

    getCellCoordinates(index) {
        const row = Math.floor(index / this.size);
        const column = index % this.size;
        return { row, column };
    }

    getCellByIndex(index) {
        const { row, column } = this.getCellCoordinates(index);
        return this.getCell(row, column);
    }

    printGrid() {
        const border = '+-----'.repeat(this.size) + '+';
        console.log(border);
        let cellCounter = 0;
        for (let row = 0; row < this.size; row++) {
            let rowString = '|';
            for (let column = 0; column < this.size; column++) {
                const cell = this.getCell(row, column);
                if (cell.value) {
                    rowString += ` ${"💣".padStart(3)} |`;
                } else {
                    rowString += ` ${(cellCounter).toString().padStart(3)} |`;
                }
                cellCounter++;
            }
            console.log(rowString);
            console.log(border);
        }
        console.log("");
    }

    printUnrevealedGrid() {
        const border = '+-----'.repeat(this.size) + '+';
        console.log(border);
        let cellCounter = 0;
        for (let row = 0; row < this.size; row++) {
            let rowString = '|';
            for (let column = 0; column < this.size; column++) {
                rowString += ` ${(cellCounter).toString().padStart(3)} |`;
                cellCounter++;
            }
            console.log(rowString);
            console.log(border);
        }
        console.log("");
    }
}

class GameTracker {
    constructor(size) {
        this.grid = new Grid(size);
        this.gameState = true; // Assume game state starts as true
    }

    setGameState(state) {
        this.gameState = state;
    }

    getGameState() {
        return this.gameState;
    }

    getGrid() {
        return this.grid;
    }

    // Other game-related methods can be added here
}

class Player {
    constructor(gameTracker) {
        this.gameTracker = gameTracker;
    }

    askForGameState() {
        const input = prompt('Start Game (y/n): ');
        if (input === 'y') {
            this.gameTracker.setGameState(true);
        } else if (input === 'n') {
            this.gameTracker.setGameState(false);
        } else {
            console.log('Invalid input. Please enter "y" or "n".');
        }
    }

    askForCellCoordinates() {
        const index = parseInt(prompt('Enter the cell number: '), 10);
        const cell = this.gameTracker.getGrid().getCellByIndex(index);

        console.log(`Cell at index ${index}:`, cell.value);
        return(cell.value);
        
    }

    // Method to start interaction
    start() {
        while (true) {
            this.askForGameState();
            this.gameTracker.getGrid().printGrid(); // Always print the grid after game state change
            if (this.gameTracker.getGameState()) {
                // this.gameTracker.getGrid().printGrid(); // Always print the grid after game state change
                const result = this.askForCellCoordinates();
                if (result == true){
                    console.log(failed);
                    break;
                    
                } else{
                    this.askForCellCoordinates()
                };
                
            } else {
                return false
                break;
            }
        }
    }
}

// Example usage
const gameTracker = new GameTracker(gridSize); // Create a grid of specified size
const player = new Player(gameTracker);

// Start the player interaction
player.start();

