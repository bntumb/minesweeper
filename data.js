export const GRID_SIZE = 3;
export const MINE_DENSITY = 0.15 + (0.01*(GRID_SIZE / 8)); // Adjust based on 8x8 grid size

export const FAILED_ASCII_ART = `
██     ██  █████  ███████ ████████ ███████ ██████  
██     ██ ██   ██ ██         ██    ██      ██   ██
██  █  ██ ███████ ███████    ██    █████   ██   ██
██ ███ ██ ██   ██      ██    ██    ██      ██   ██
 ███ ███  ██   ██ ███████    ██    ███████ ███████
`;
import promptSync from 'prompt-sync';
export const prompt = promptSync(); // Now 'prompt' is available for use






