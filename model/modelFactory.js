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

var sequelize = null;

const initModelFactory = function(onSuccess,onFail){
	
	console.log('ModelFactory: initModelfactory:');

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

const getORMRef = function(){
	console.log('modelFactory: getORMRef');
	return sequelize;
}




module.exports = { initModelFactory, getORMRef };

//