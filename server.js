const express = require('express');
const app = express();
const port = 4300;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('app/data/sqlitedb');
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require('./app/routes')(app, db);

app.listen(port, () => {
    console.log('Backend NodeJS live on ' + port);
});

