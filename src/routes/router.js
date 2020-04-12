const {Router} = require('express')
const {Tasks} = require('../db')

const route = Router()

// Get all todos 
route.get('/todo', (req, res) => {
    // const users = Tasks.findAll()
    // console.log('Title')
    // for (let user of users) {
    //     console.log(`${user.Title}`)
    // }
    // res.send(users);
});

// Add a new todo
route.post('/todo', (req, res) => {
    res.send(data);
});

// Details of specific todo based on id
route.get('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    res.send(data);
});

// Update details of specific todo
route.patch('/todo', (req, res) => {
    res.send(data);
});

// Get list of all notes under specific todo
route.get('/todo/:id/notes', (req, res) => {
    const id = parseInt(req.params.id);
    res.send(data);
});

// Add a new note under specific todo
route.post('/todo/:id/notes', (req, res) => {
    const id = parseInt(req.params.id);
    res.send(data);
});

