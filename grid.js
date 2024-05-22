

import { prompt, GRID_SIZE, MINE_DENSITY, FAILED_ASCII_ART } from './data.js';

class Cell {
    constructor(row, column, value = false) {
        this.row = row;
        this.column = column;
        this.value = value;
        this.revealed = false;
        this.adjacentMines = 0; // New property to store the count of adjacent mines
        this.flagged = false;   // Property to indicate if the cell is flagged
    }

    reveal() {
        this.revealed = true;
    }

    outputCell() {
        const cellIndex = ` ${this.row * GRID_SIZE + this.column} `;

        if (this.flagged) {
            return ` ${cellIndex} (🚩)`;
        } else if (this.revealed) {
            if (this.value) {
                return ' 💣 ';
            } else if (this.adjacentMines > 0) {
                return ` ${cellIndex} (${this.adjacentMines}) `;
            } else {
                return `${cellIndex}(E)`;
            }
        } else {
            return ` ${cellIndex} `;
        }
    }
}

class Grid {
    constructor(size) {
        this.size = size;
        this.cells = this.generateCells(size);
        this.updateAdjacentMineCounts(); // Calculate the adjacent mine counts after generating cells
    }

    generateCells(size) {
        const cellCount = size * size;
        const mineCount = Math.ceil(cellCount * MINE_DENSITY);
        console.log(`Take care! There ${mineCount > 1 ? "are" : "is"} ${mineCount} ${mineCount > 1 ? "mines" : "mine"} out there`);
        const values = Array(mineCount).fill(true).concat(Array(cellCount - mineCount).fill(false));
        this.shuffle(values);
        return Array.from({ length: size }, (_, row) => {
            return Array.from({ length: size }, (_, column) => {
                const value = values.pop();
                return new Cell(row, column, value);
            });
        });
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    getCell(row, column) {
        return this.cells[row][column];
    }

    revealCell(row, column) {
        const cell = this.getCell(row, column);
        if (!cell.revealed) {
            cell.reveal();
            if (cell.value) {
                return false; // Return false if a mine is revealed
            } else if (cell.adjacentMines === 0) {
                this.revealAdjacentCells(row, column); // Reveal adjacent cells if no adjacent mines
            }
        }
        return true; // Return true otherwise
    }

    isValid(row, column) {
        return row >= 0 && row < this.size && column >= 0 && column < this.size;
    }

    updateAdjacentMineCounts() {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        
        this.cells.forEach(row => {
            row.forEach(cell => {
                if (!cell.value) {
                    let count = 0;
                    directions.forEach(([dx, dy]) => {
                        const newRow = cell.row + dx;
                        const newColumn = cell.column + dy;
                        if (this.isValid(newRow, newColumn) && this.getCell(newRow, newColumn).value) {
                            count++;
                        }
                    });
                    cell.adjacentMines = count;
                }
            });
        });
    }

    revealAdjacentCells(row, column) {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        directions.forEach(([dx, dy]) => {
            const newRow = row + dx;
            const newColumn = column + dy;
            if (this.isValid(newRow, newColumn)) {
                const adjacentCell = this.getCell(newRow, newColumn);
                if (!adjacentCell.revealed && !adjacentCell.flagged) {
                    adjacentCell.reveal();
                    if (adjacentCell.adjacentMines === 0) {
                        this.revealAdjacentCells(newRow, newColumn);
                    }
                }
            }
        });
    }

    revealAllMines() {
        this.cells.forEach(row => {
            row.forEach(cell => {
                if (cell.value) {
                    cell.reveal();
                }
            });
        });
    }

    print() {
        const border = '+-------------'.repeat(this.size) + '+';
        console.log(border);
        this.cells.forEach(row => {
            let rowString = '|';
            row.forEach(cell => {
                rowString += cell.outputCell().padStart(13) + '|';
            });
            console.log(rowString);
            console.log(border);
        });
        console.log('');
    }
}


class GameTracker {
    constructor(size) {
        this.grid = new Grid(size);
        this.gameState = true;
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
}

class Player {
    constructor(gameTracker) {
        this.gameTracker = gameTracker;
        this.isFirstClick = true;
    }

    askForGameState() {
        let input = '';
        while (input !== 'y' && input !== 'n') {
            input = prompt('Start Game (y/n): ');
            if (input === 'y') {
                this.gameTracker.setGameState(true);
            } else if (input === 'n') {
                this.gameTracker.setGameState(false);
            } else {
                console.log('Invalid input. Please enter "y" or "n".');
            }
        }
    }

    askForCellCoordinates() {
        const input = prompt('Enter the cell number (e.g., 10 or 10f to flag): ');
        let flag = false;

        if (input.endsWith('f') || input.endsWith('F')) {
            flag = true;
        }

        const index = parseInt(input, 10);
        if (isNaN(index) || index < 0 || index >= GRID_SIZE * GRID_SIZE) {
            console.log('Invalid cell number. Please try again.');
            return;
        }

        const row = Math.floor(index / GRID_SIZE);
        const column = index % GRID_SIZE;
        const cell = this.gameTracker.getGrid().getCell(row, column);

        if (this.isFirstClick && cell.value) {
            console.log('First click on a mine! Creating new grid...');
            this.gameTracker.grid = new Grid(GRID_SIZE);
            this.isFirstClick = true;
            return;
        }

        if (flag) {
            cell.flagged = true;
            console.log(`Cell (${row}, ${column}) flagged.`);
        } else {
            const isSafe = this.gameTracker.getGrid().revealCell(row, column);
            console.log(`Cell(${row}, ${column}) value: ${cell.value ? "mine" : "no mine here"}`);
    
            if (!isSafe) {
                this.gameTracker.setGameState(false);
            }
        }

        this.isFirstClick = false;
    }

    start() {
        this.askForGameState();
        while (this.gameTracker.getGameState()) {
            this.gameTracker.getGrid().print();
            this.askForCellCoordinates();
        }
        this.gameTracker.getGrid().revealAllMines();
        this.gameTracker.getGrid().print();
        console.log("You hit a mine\n" + FAILED_ASCII_ART);
    }
}

const gameTracker = new GameTracker(GRID_SIZE);
const player = new Player(gameTracker);
player.start();
