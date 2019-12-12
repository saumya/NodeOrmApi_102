//
// UI : Entry of application
//
// POST for CREATE
// PUT for UPDATE 
//
//
console.log('+-----------------------------------------');
console.log('| Application: Init');
console.log('+-----------------------------------------');

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
    console.log('+-----------------------------------------');
    console.log('| Application: Init : Done ');
    console.log('+-----------------------------------------');
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
// ------------------------------- GET -----------------------------------
//
app.get('/', (req, res) => res.send('Welcome to API Server.'));
//
app.get('/initModels', (request,response) => {
  modelFactory.initTheModels();
  response.send('Model Initiation. SUCCESS.');
});
// 
app.get('/getBatchNames', (req,res) => {
  console.log('app.js: API: Get BatchNames');
  //
  var onGotResponseFromModel = function(allBatches){
    console.log('app.js: API: onGotResponseFromModel');
    res.send(allBatches);
  }
  //get data from Model
  modelFactory.getAllGroupNames(onGotResponseFromModel);
  //
  
  //prepare the response

  var tNow = new Date();
  var sTime = tNow.getHours()+':'+tNow.getMinutes()+':'+tNow.getSeconds()+':'+tNow.getMilliseconds();
  var result = {
    "fromServerAt": sTime
  }
  //send the response
  //res.send(result);
});
// AllPeople in a Batch
// eaxmple call URL- http://localhost:3000/getPeople/myBatchName
app.get('/getPeople/:groupName', (request,response) => {
  //
  //console.log('app.js : /getPeople');
  console.log('app.js : /getPeople : request.params=',request.params);
  var onGotPeopleFromModel = function(allPeople){
    console.log('app.js: API: onGotPeopleFromModel');
    /*
    //console.log(allPeople);
    console.log(allPeople.length);
    //res.send(allBatches);
    */
    if(allPeople.length>0){
      /*
      console.log( allPeople[0].name );
      console.log( allPeople[0].phone );
      console.log( allPeople[0].batch_is_morning );
      */
      response.send(allPeople);
    }else{
      response.send({"result":"No persons!"});
    }
  }
  //
  var gName = request.params.groupName;
  modelFactory.getAllPeopleOfGroup(gName,onGotPeopleFromModel);
  //
  //response.send({"server":"/getPeople yey! "});
});
//
app.get('/getDays/:groupName',(request,response)=>{
  // Response Callback
  var onGotDaysFromModel = function(allDays){
    //console.log(allDays);
    //response.send(allDays);
    if(allDays.length>0){
      response.send(allDays);
    }else{
      response.send({"result":"No Days!"});
    }
  }
  // Server Call
  var gName = request.params.groupName;
  modelFactory.getAllDaysOfGroup(gName,onGotDaysFromModel);
});
//
app.get('/getPresence/:groupName/:forDate/:sessionName',(request,response)=>{
  //
  var sGroup = request.params.groupName;
  var sDate = request.params.forDate;
  var sSessionName = request.params.sessionName;
  //
  console.log(request.params);

  const onGotPresents = function(allPresents){
    response.send(allPresents);
  }
  modelFactory.getPresentsForTheDate({
    "groupName": sGroup,
    "sDate": sDate,
    "session": sSessionName
  },onGotPresents);
  //
  //response.send({"result":"Yay!"});
});
//
// ------------------------------- GET / -----------------------------------
//
// ------------------------------- POST -----------------------------------
//
app.post('/createGroup', (request,response)=>{
  console.log('app.js: API: CreateGroup');
  //console.log(modelFactory);
  //console.log( 'request.body=',request.body );
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
app.post('/addPerson', (request,response)=>{
  //console.log( 'request.body=',request.body );
  modelFactory.createPerson(request.body);
  //
  response.send({"server":"yey!"});
});
//
app.post('/addDates',(req,res)=>{
  console.log('/addDates');
  //console.log(req.body);
  //
  var batchId = req.body.batchId;
  var batchName = req.body.batchName;
  var allDays = req.body.days;
  //
  for (item in allDays){ console.log(item,allDays[item]) 
    modelFactory.createDate({
      "batchName": batchName,
      "batchId": batchId,
      "day": item,
      "date": allDays[item]
    });
  }
  //
  //modelFactory.createDate({"day": "day1", "date": allDays.day1});
  //
  res.send({"server":"Yay!"});
});
// Mark present
app.post('/markPersonPresent', (request,response)=>{
  console.log('app.js : /markPersonPresent :');
  //console.log(request.body);
  modelFactory.createPresence(request.body);
  //
  response.send(request.body);
});
// ------------------------------- POST / -----------------------------------
//
app.listen(port, () => console.log(`My App listening on port ${port}!`));
//