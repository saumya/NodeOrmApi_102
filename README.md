Remote MySQL
========================

 - Moved to [mysql2][2] from [mysql][1]. 
 - ORM used is [Sequelize][3] version 5.

One must install `body-parser` along with `express` inorder to use `POST` requests.

```
npm install --save mysql2
npm install --save sequelize
```
Running the basic applciation `node .`


## UI Application

```
npm install --save express
npm install --save body-parser
```
Now running the application can be done by `node app.js` or `npm start`.



### API
 
 - /initModels : first call to initialise the Database




[1]: https://www.npmjs.com/package/mysql
[2]: https://www.npmjs.com/package/mysql2
[3]: https://sequelize.org/v5/manual/getting-started.html