var PORT = process.env.PORT || 3001
const express = require('express');
//const bodyParser = require('body-parser');

const {db, Tasks} = require('./db');
const tasksRoute = require('./routes/todos');

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())
//app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/todos', tasksRoute); 


db.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server started on port 3001");
        })
    })
    .catch((error) => {
        console.log("Unable to connect to database: " + error);
    })