const express = require('express');
//const bodyParser = require('body-parser');

const {db, Tasks} = require('./db');
const tasksRoute = require('./routes/router');

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())
//app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));
app.use('/routes', tasksRoute); 


db.sync()
    .then(() => {
        app.listen(3001, () => {
            console.log("Server started on port 3001");
        })
    })
    .catch((error) => {
        console.log("Unable to connect to database: " + error);
    })