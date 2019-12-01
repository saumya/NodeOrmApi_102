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
const modelFactory = require('./model/modelFactory');
modelFactory.initModelFactory(onModelInitDone,onModelInitFail);

function onModelInitDone(sequelize){
    console.log('index.js: onModelInitDone');
    //console.log('sequelize',sequelize);
    
    //sequelize = modelFactory.getORMRef();
    //console.log(sequelize);
    
    //modelFactory.initTheModels();
}
function onModelInitFail(error){
    console.log('index.js: onModelInitFail');
    console.log('error',error);
}
//
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/initModels', (request,response) => {
	modelFactory.initTheModels();
});
//
app.listen(port, () => console.log(`My App listening on port ${port}!`));