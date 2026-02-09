const express = require('express');
const app = express();

const students = [
    { id: 1, name: 'node', age: 18 },
    { id: 2, name: 'express', age: 19 },
    { id: 3, name: 'javascript', age: 20 }
];  

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const validateStudent = (req, res, next) => {
    const { name, age } = req.query;
    if (!name || !age) {
        return res.status(400).send("Invalid data");
    }
    next();
}



app.get('/api/students', (req, res) => {
    res.send(students)
})
app.get('/api/students/:id' , (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (student) {
        res.send(student);
    } else {
        res.status(404).send("Error 404: student not found");
    }
})


app.post('/api/students' , validateStudent, (req, res) => {
    
    if (!req.body.name || !req.body.age) {
        return res.status(400).send("name is required");
    }
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        age: req.body.age
    };
    students.push(newStudent);
    res.send(newStudent);
});

app.put('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (!student) {
        return res.status(404).send("student not found");
    }
    if (!req.body.name || !req.body.age) {
        return res.status(400).send("name and age are required");
    }
    student.name = req.body.name;
    student.age = req.body.age;
    res.send(student);
});

app.delete('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).send("student not found");
    }
    students.splice(index, 1);
    res.send("student deleted successfully");
});


app.get('/search',validateStudent, (req, res) => {

    const name = req.query.name;
    const age = req.query.age;

    res.send(`Searching for name: ${name}, age: ${age}`);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

