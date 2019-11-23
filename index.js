console.log('Remote SQL');

var config = require('./remotemysql.config');
var mysql = require('mysql2');


//console.log(config);

console.log('+--------------- START ---------------------');

//var mysql = require('mysql');
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
        console.error('error connecting: ' + error.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
} );
//TODO
/*
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
*/
/*
connection.query('SELECCT * from *', function(error,results,fields){
    if(error) throw error;
    console.log(results);
});
*/
//
connection.end();

console.log('+---------------- END ----------------------');