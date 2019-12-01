console.log('Remote SQL');

var config = require('./remotemysql.config.sample');
var mysql = require('mysql2');
const Sequelize = require('sequelize');

const getBatchModel = require('./model/model.batch');
const getPersonModel = require('./model/model.person');
const getDayModel = require('./model/model.day');
const getPresentModel = require('./model/model.present');

//const BatchModel = require('./model/model.batch');


//console.log(config);
/*
var connection = mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database
});
//
connection.connect( function(error){
    if (error) {
        console.error('mysql2: error connecting: ' + error.stack);
        return;
    }
    console.log('mysql2: connected as id ' + connection.threadId);
} );

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
//
connection.end();
*/

// Sequelize
const sequelize = new Sequelize(config.database, config.user, config.password, {
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
        //sequelize.close().then(function(result){ console.log('Sequelize: Connection closed.') }).catch(function(error){ console.log(error) });
        
        var ModelBatch = getBatchModel(sequelize);
        var ModelPerson = getPersonModel(sequelize);
        var ModelDay = getDayModel(sequelize);
        var ModelPresent = getPresentModel(sequelize);

        //var ModelBatch = new BatchModel(sequelize);
        //console.log(ModelBatch);
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

    })
    .catch(err => {
        console.log('+--- Sequelize - Error ---------------');
        console.error('Sequelize: Unable to connect to the database:', err);
    });
//
//sequelize.close();
// The above call to close(), throws an error as shown below
// Error - Unable to connect to the database: Error: pool is draining and cannot accept work

console.log('+---------------- END ----------------------');