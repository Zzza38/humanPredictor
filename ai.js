// Initialize a Markov chain table to store move sequences
const data = {
    "rock": { "rock": 0, "paper": 0, "scissors": 0 },
    "paper": { "rock": 0, "paper": 0, "scissors": 0 },
    "scissors": { "rock": 0, "paper": 0, "scissors": 0 }
};


// Function to update the Markov chain table
function updateData(lastMove, currentMove) {
    if (data[lastMove]) {
        data[lastMove][currentMove]++;
    }
}
function isValid(move) {
    if (data[move]) {
        return true
    }
    return false
}
// Function to predict the next move based on the last move
function predictRPS(lastMove) {
    const moveProbabilities = data[lastMove];

    // Calculate the most likely next move based on frequencies
    let predictedMove = chooseRandomKey(data)
    let maxCount = -1;

    for (const [move, count] of Object.entries(moveProbabilities)) {
        if (count > maxCount) {
            maxCount = count;
            predictedMove = move;
        }
    }

    return predictedMove;
}
function chooseRandomKey(obj) {
    const keys = Object.keys(obj); // Get all top-level keys
    const randomKey = keys[Math.floor(Math.random() * keys.length)]; // Choose a random key
    return randomKey; // Return the random key
}

// Export both functions
module.exports = { predictRPS, updateData, isValid };
