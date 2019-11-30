console.log('Remote SQL');

var config = require('./remotemysql.config.sample');
var mysql = require('mysql2');
const Sequelize = require('sequelize');


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
        sequelize.close().then(function(result){ console.log('Sequelize: Connection closed.') }).catch(function(error){ console.log(error) });
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