//
// UI : Entry of application
//
console.log('+---------------------------');
console.log('| Application: Init');
console.log('+---------------------------');

const express = require('express');
const app = express();
const port = 3000;
//
app.get('/', (req, res) => res.send('Hello World!'));
//
app.listen(port, () => console.log(`My App listening on port ${port}!`));