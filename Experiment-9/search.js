const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./models/student');

const app = express();
const port = 3000;

// Replace this connection string with your MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://devops:devops@cluster0.5298ya3.mongodb.net/studentDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint for home page
app.get('/', (req, res) => {
    res.redirect('/search');
});

// Endpoint for searching students
app.get('/search', (req, res) => {
    let searchCriteria = {};
    const { name, age, grade } = req.query;

    if (name) {
        searchCriteria.name = { $regex: new RegExp(name, 'i') };
    }
    if (age) {
        searchCriteria.age = age;
    }
    if (grade) {
        searchCriteria.grade = { $regex: new RegExp(grade, 'i') };
    }

    Student.find(searchCriteria)
        .then((students) => {
            res.render('search', { students, name, age, grade });
        })
        .catch((err) => {
            console.log("Error searching students", err);
            res.status(500).send("Error searching students");
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
