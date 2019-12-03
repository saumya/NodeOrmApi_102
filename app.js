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

//app.use(express.bodyParser());
//app.use( require('connect').bodyParser() );
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//
//--------------------CORS--------------------------------------------------
// CORS : enabling 
/*
// ref: https://enable-cors.org/
app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  
  //res.header("Access-Control-Allow-Origin", "*:*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", "http://localhost:1234"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Origin", "127.0.0.1:1234"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/



// ref: https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


/*
// npm install --save cors
//
const cors = require("cors");
const corsOptions = {
    origin: "*", // Or pass origins you want
    credentials: true
};
app.use(cors(corsOptions));
*/

//--------------------/CORS--------------------------------------------------
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
app.get('/', (req, res) => res.send('Welcome to API Server.'));
app.get('/initModels', (request,response) => {
	modelFactory.initTheModels();
});
app.post('/createGroup', (request,response)=>{
	console.log('app.js: API: CreateGroup');
	//console.log(modelFactory);
	console.log( 'request.body=',request.body );
  //
  var newGroupName = request.body.groupName;
  //
  modelFactory.createGroupWithName(newGroupName);
  //
	var tNow = new Date();
	var sTime = tNow.getHours()+':'+tNow.getMinutes()+':'+tNow.getSeconds()+':'+tNow.getMilliseconds();
	var result = {
		"fromUIAt": request.body.calledAt,
    "fromServerAt": sTime,
		"greet":"Hello from server",
		"api-message":"POST request to CreateGroup"
	};
	response.send(result);
	//
	//response.send('app.js: POST request to CreateGroup');
});
//
app.listen(port, () => console.log(`My App listening on port ${port}!`));
//