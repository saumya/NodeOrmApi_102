//
// UI : Entry of application
//
// POST for CREATE
// PUT for UPDATE 
//
//
console.log('+---------------------------');
console.log('| Application: Init');
console.log('+---------------------------');

const express = require('express');
const app = express();
const port = 3000;
//
//var bodyParser = require("body-parser");
// body-parser is now included in Express as of 4.16
// ref: Changelog: https://expressjs.com/en/changelog/4x.html
//
//----------------------------------------------------------------------
// CORS : enabling 
// ref: https://enable-cors.org/
app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", "http://localhost:1234"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Adding body-parser
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
//----------------------------------------------------------------------
//
const modelFactory = require('./model/modelFactory');
modelFactory.initModelFactory(onModelFactoryInitDone,onModelFactoryInitFail);

function onModelFactoryInitDone(sequelize){
    console.log('app.js: onModelFactoryInitDone');
    //console.log('sequelize',sequelize);
    
    //sequelize = modelFactory.getORMRef();
    //console.log(sequelize);
    
    //modelFactory.initTheModels();
}
function onModelFactoryInitFail(error){
    console.log('app.js: onModelFactoryInitFail');
    console.log('error',error);
}

//
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/initModels', (request,response) => {
	modelFactory.initTheModels();
});
app.post('/createGroup', (request,response)=>{
	console.log('app.js: API: CreateGroup');
	//console.log(modelFactory);
	console.log( 'request.body=',request.body );
	var result = {
		"api-message":"POST request to CreateGroup"
	};
	response.send(result);
	//
	//response.send('app.js: POST request to CreateGroup');
});
//
app.listen(port, () => console.log(`My App listening on port ${port}!`));
//