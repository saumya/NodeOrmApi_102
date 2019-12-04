// factory
//

const config = require('../remotemysql.config.sample');

const mysql = require('mysql2');
const Sequelize = require('sequelize');

const Model = Sequelize.Model;

const getBatchModel = require('./model.batch');
const getPersonModel = require('./model.person');
const getDayModel = require('./model.day');
const getPresentModel = require('./model.present');

const ModelFactoryVersion = '1.0.0';

var sequelize = null;

var ModelBatch = null;
var ModelPerson = null;
var ModelDay = null;
var ModelPresent = null;

// ----------------------------------------------------------------------
// This is the first function to be called.
// This initialises the ORM and stores it
// ----------------------------------------------------------------------
const initModelFactory = function(onSuccess,onFail){
	
	console.log('ModelFactory: initModelfactory:');
	console.log('ModelFactoryVersion', ModelFactoryVersion);

	sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
     }
  });
  sequelize
    .authenticate()
    .then(() => {
    	console.log('+--- Sequelize ---------------');
      console.log('Sequelize: Connection has been established successfully.');
      onSuccess(sequelize);
    })
    .catch( err => {
    	console.log('+--- Sequelize - Error ---------------');
      console.error('Sequelize: Unable to connect to the database:', err);
      onFail(err);
    });
};

// ----------------------------------------------------------------------
// Get a reference to the ORM
// ----------------------------------------------------------------------
const getORMRef = function(){

	console.log('modelFactory: getORMRef');
	console.log('this.ModelFactoryVersion', this.ModelFactoryVersion); // just checking
	console.log('ModelFactoryVersion', ModelFactoryVersion); // just checking
	
	return sequelize;
}

// ---------------------------------------------------------------------------------------
// Initialises the Models and saves them.
// The ORM creates the tables and if it is already present, deletes them and re-creates
// ---------------------------------------------------------------------------------------

const initTheModels = function(){
	console.log('initTheModels');
	//console.log('this.sequelize',this.sequelize);
	//console.log('sequelize',sequelize);
	
	
  ModelBatch = getBatchModel(sequelize);
  ModelPerson = getPersonModel(sequelize);
  ModelDay = getDayModel(sequelize);
  ModelPresent = getPresentModel(sequelize);

	ModelBatch.sync({force:true}).then(()=>{
      // Now the `batches` table in the database corresponds to the model definition
      console.log('Sequelize: Synced! ModelBatch');
      console.log(ModelBatch);
  }).catch(err => {
      console.log('+--- Sequelize - Error ---------------');
      console.error('Sequelize: Model Error: ModelBatch: ', err);    
  });
  //
  ModelPerson.sync({force:true}).then(()=>{
      console.log('Sequelize: Synced! ModelPerson');
      console.log(ModelPerson);
  }).catch(err=>{
      console.log('+--- Sequelize - Error ---------------');
      console.error('Sequelize: Model Error: ModelPerson: ', err);
  });
  //
  ModelDay.sync({force:true}).then( () => {
      console.log('Sequelize: Synced! ModelDay');
      console.log(ModelDay);
  }).catch(err => {
      console.log('+--- Sequelize - Error ---------------');
      console.error('Sequelize: Model Error: ModelDay: ', err);
  });
  //
  ModelPresent.sync({force:true}).then(()=>{
      console.log('Sequelize: Synced! ModelPresent');
      console.log(ModelPresent);
  }).catch(err=>{
      console.log('+--- Sequelize - Error ---------------');
      console.error('Sequelize: Model Error: ModelPresent: ', err);
  });
  
}

//Create a new Group
const createGroupWithName = function(newGroupName){
  console.log('modelFactory: createGroupWithName=',newGroupName);
  
  var ModelBatch = getBatchModel(sequelize);
  
  ModelBatch.create({
    name:newGroupName
  }).then(function(data){
    console.log('modelFactory : createGroupWithName : SUCCESS:');
    //console.log(data);
  }).catch(function(error){
    console.log('modelFactory : createGroupWithName : catch:');
    console.log(error);
  });  
}

//Create a new Person
const createPerson = function(newPerson){
  console.log('modelFactory: createPerson:');
  console.log('modelFactory: createPerson: person=',newPerson);
  /*
  console.log(newPerson.personName);
  console.log( Number(newPerson.phone) );
  console.log(newPerson.group); //morning/evening
  console.log(newPerson.batch); 
  */
  var isMorning = false;
  if(newPerson.group==='morning'){
    isMorning = true;
  }

  var newPersonData = {
    name: newPerson.personName,
    phone: Number(newPerson.phone),
    batch_is_morning: isMorning,
    group_name: newPerson.batch
  }
  //console.log('newPersonData=',newPersonData);
  
  //console.log(ModelPerson);//null
  ModelPerson = getPersonModel(sequelize);
  ModelPerson.create(newPersonData).then(function(data){
    console.log('modelFactory : createPerson : SUCCESS:');
  }).catch(function(error){
    console.log('modelFactory : createPerson : catch:');
    console.log(error);
  });
  
}

//getAllGroupNames
const getAllGroupNames = function(onGotResponseFromModel){
  console.log('modelFactory : getAllGroupNames');

  var ModelBatch = getBatchModel(sequelize);
  ModelBatch.findAll().then(function(modelBatches){
    //console.log(modelBatches);
    onGotResponseFromModel(modelBatches);
  }).catch(function(error){
    console.log('modelFactory : getAllGroupNames : catch:');
    console.log(error);
  });
}


module.exports = { 
  initModelFactory, 
  getORMRef, 
  initTheModels,
  getAllGroupNames,
  createGroupWithName, createPerson 
};

//