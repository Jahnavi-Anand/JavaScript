// Importing required modules
const express = require('express');

// Creating an Express application
const app = express();
const port = 3000;

// Endpoint for addition
app.get('/add', (req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) + parseFloat(num2);
    res.send(`Result of ${num1} + ${num2} = ${result}`);
});

// Endpoint for subtraction
app.get('/subtract', (req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) - parseFloat(num2);
    res.send(`Result of ${num1} - ${num2} = ${result}`);
});

// Endpoint for multiplication
app.get('/multiply', (req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) * parseFloat(num2);
    res.send(`Result of ${num1} * ${num2} = ${result}`);
});

// Endpoint for division
app.get('/divide', (req, res) => {
    const { num1, num2 } = req.query;
    if (parseFloat(num2) === 0) {
        res.status(400).send('Error: Division by zero');
    } else {
        const result = parseFloat(num1) / parseFloat(num2);
        res.send(`Result of ${num1} / ${num2} = ${result}`);
    }
});

// Default response for root URL
app.get('/', (req, res) => {
    res.send('Welcome to the basic calculator API!');
});

// Default response for invalid endpoints
app.use((req, res) => {
    res.status(404).send('Invalid endpoint');
});

// Starting the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


//add?num1=5&num2=3
//subtract?num1=10&num2=7
//multiply?num1=4&num2=6
//divide?num1=8&num2=2