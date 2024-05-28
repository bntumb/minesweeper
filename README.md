# Minesweeper
### Prerequisites

To play the game, you'll need Node.js installed on your computer. You can download and install it from [here](https://nodejs.org/).

### How to Play
When you start the game, you'll be asked if you want to begin. Type 'y' to start or 'n' to exit.

**Revealing Cells:** Enter the cell number (e.g., 10) to reveal a cell.
Flagging Mines: If you suspect a cell contains a mine, you can flag it by entering the cell number followed by 'f' (e.g., 10f).
## Game Flow
**First Click:** The game ensures that your first click is never a mine.

**Reveal or Flag:** Continue revealing cells or flagging suspected mines. If a cell with no adjacent mines is revealed, the game will automatically reveal surrounding cells.

**Win or Lose:** If you reveal a mine, the game ends, and all mines are revealed. If you successfully reveal all non-mine cells, you win.

### Key Features
**Randomized Mines:** Mines are randomly placed in the grid, providing a unique experience every game.
**Safety on First Click:** Your first click is always safe, ensuring you get a fair start.
**Automatic Reveals:** Revealing a cell with no adjacent mines will automatically uncover its neighbors, making the game more dynamic.
Enjoy the challenge of Minesweeper, and test your logic and strategy skills. Happy playing!

![image](https://github.com/bntumb/minesweeper/assets/51305376/35cc1b34-b74d-4264-b48d-26d87c4c37bf)

### Installation

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/your-username/minesweeper-game.git
    ```
2. **Navigate to the Game Directory**:
    ```sh
    cd minesweeper-game
    ```

### Running the Game

Run the game using Node.js:
```sh
node grid.js
```
### License
This project is licensed under the MIT License. See the LICENSE file for details.
