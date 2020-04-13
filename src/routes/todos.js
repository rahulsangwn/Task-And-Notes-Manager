const {Router} = require('express')
const {Tasks} = require('../db')

const route = Router()

// Get all todos 
route.get('/', async (req, res) => {
    const tasks = await Tasks.findAll()
    res.send(tasks)
});

// Add a new todo
route.post('/', async (req, res) => {
    if (typeof req.body.params === 'string') {
        return res.status(400).send({
            error: 'Task name not provided'
        })
    }
    
    const newTask = await Tasks.create({
        Title: req.body.title,
        State: req.body.state,
        Description: req.body.description,
        DueDate: req.body.duedate,
        Priority: req.body.priority
    })
    res.status(201).send({
        success: 'New task added'
    })
});

// Details of specific todo based on id
route.get('/:id', async (req, res) => {
    if(isNaN(Number(req.params.id))) {
        return res.status(400).send({
            error: 'Task id must be an Integer'
        })
    }

    const task = await Tasks.findByPk(req.params.id)

    if(!task) {
        return res.status(404).send({
            error: 'No task found with this id'
        })
    }
    res.send(task)
    
});

// Update details of specific todo
route.patch('/', (req, res) => {
    res.send(data);
});

// Get list of all notes under specific todo
route.get('/:id/notes', (req, res) => {
    const id = parseInt(req.params.id);
    res.send(data);
});

// Add a new note under specific todo
route.post('/:id/notes', (req, res) => {
    const id = parseInt(req.params.id);
    res.send(data);
});

module.exports = route