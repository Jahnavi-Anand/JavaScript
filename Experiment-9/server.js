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

app.get('/', (req, res) => {
    res.render('student');
});

app.post('/addStudent', (req, res) => {
    const { name, age, grade } = req.body;
    const student = new Student({
        name: name,
        age: age,
        grade: grade
    });
    student.save()
        .then(() => {
            console.log("Student details added successfully:", student);
            res.send("Student details added successfully");
        })
        .catch((err) => {
            console.log("Error adding student details", err);
            res.status(500).send("Error adding student details");
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
