const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});



const operation = (type, a, b) => {
    if (type === 'add') {
        return a + b;
    } else if (type === 'subtract') {
        return a - b;
    } else if (type === 'multiply') {
        return a * b;
    } else if (type === 'divide') {
        return a / b;
    } else {
        console.log('Invalid operation type');
        return null;
    }
};

console.log(operation('add', 4, 5));
console.log(operation('subtract', 10, 3));
console.log(operation('multiply', 5, 6));
console.log(operation('divide', 8, 2));



