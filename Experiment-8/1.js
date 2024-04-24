// Importing required module
const readline = require('readline');

// Creating readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Asking user for input
rl.question('Enter a string: ', (inputString) => {
    // Using regular expression to replace two or more consecutive 'a's with 'b'
    const replacedString = inputString.replace(/aa+/g, 'b');
    // Displaying the result
    console.log('Replaced string:', replacedString);

    // Closing the interface
    rl.close();
});
