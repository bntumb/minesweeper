// cell.test.js
const { Cell } = require('./grid');

describe('Cell', () => {
    test('should return correct output for a unrevealed cell with no mine and not flagged', () => {
        const cell = new Cell(0, 0, false);
        expect(cell.outputCell()).toBe(' 0 (E)');
    });

    test('should return correct output for a unrevealed cell with a mine and not flagged', () => {
        const cell = new Cell(0, 0, true);
        expect(cell.outputCell()).toBe(' 💣 ');
    });
});
