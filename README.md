Remote MySQL
========================

 - Moved to [mysql2][2] from [mysql][1]. 
 - ORM used is [Sequelize][3] version 5.

### TODO
 - Need to check for duplication of data in database


```
npm install --save mysql2
npm install --save sequelize
```
Running the basic applciation `node .`


## UI Application

```
npm install --save express
```
Now running the application can be done by `node app.js` or `npm start`.


## UI code reference

The data to be sent
```
var jsonData = JSON.stringify({
			"calledAt" : "called time",
			"groupName": "UI Application"
		});
```

Fetch API
```
// using Fetch API
var fetchData = {
	method:'POST',
	body:JSON.stringify({"one":"test","two":"testTwo","fromUI":"Yay!"}),
	mode: 'cors',
	headers:new Headers({
		'Content-Type': 'application/json'
	})
};
fetch(requestURL,fetchData).then(function(resultData){
	resultData.json()
	.then(function(rData){
		console.log(rData);
	})
	.catch(function(error1){
		console.log(error1);
	});
}).catch(function(error){
	console.log(error);
});
```

jQuery Ajax
```
$.ajax({
  method: "POST",
  url: requestURL,
  contentType: "application/json",
  dataType: "json",
  data: jsonData,
  cache: false
})
.always(function( data ){
	console.log(data);
})
.done(function( msg ) {
	console.log(msg);
})
.fail(function( err ){
	console.log(err);
});
```



### API

GET

 - /initModels : first call to initialise the Database

 - /getBatchNames : Get All the Group Names
 - /getPeople/:groupName : All people of a Group (Ex: Nov 2018)

POST

 - /createGroup : Creates a New Group
 - /addPerson : Creates a New Person
 - /markPersonPresent : Marks present for a person











[1]: https://www.npmjs.com/package/mysql
[2]: https://www.npmjs.com/package/mysql2
[3]: https://sequelize.org/v5/manual/getting-started.html