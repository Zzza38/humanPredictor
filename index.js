const readline = require('readline');
const { predictRPS, updateData } = require('./ai'); // Assuming 'ai.js' contains your AI logic

const gameTable = {
    "rock": "scissors",
    "scissors": "paper",
    "paper": "rock"
}
let moves = 0;
let aiWins = 0;

// Create an interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt user for input
function prompt(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim()); // Trim to remove leading/trailing whitespace
        });
    });
}

// Function to validate user input
function isValid(input) {
    const validMoves = ['Rock', 'Paper', 'Scissors'];
    return validMoves.includes(input);
}

// Main function to run the game
async function main() {
    let input;
    let lastMove = 'Rock'; // Starting last move
    while (true) {
        input = await prompt('Enter your move (Rock, Paper, Scissors) -> "stop" to stop: ').toLowerCase();
        if (input === 'stop') {
            console.log('Game stopped.');
            break;
        }
        if (!isValid(input)) {
            console.log('Invalid move! Please enter Rock, Paper, or Scissors.');
            continue; // Ask for input again
        }
        
        let aiPrediction = predictRPS(lastMove);
        console.log(`AI Move: ${gameTable[aiPrediction]}`);
        console.log(`Your move: ${input}`);
        if (aiPrediction === input) {
            console.log('AI wins!');
            aiWins += 1;
        } else {
            console.log('You win!');
        }
        moves += 1;
        console.log('AI win rate: ' + aiWins / moves * 100)
        // Update data with the last move and the user's input
        updateData(lastMove, input);
        lastMove = input; // Update last move
    }

    // Close the readline interface
    rl.close();
}

// Start the game
main();
