const {Router} = require('express')
const {Tasks, Notes} = require('../db')

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
route.patch('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    //const task = await Tasks.findByPk(req.params.id)
    const newTask = await Tasks.update({
        Title: req.body.title,
        State: req.body.state,
        Description: req.body.description,
        DueDate: req.body.duedate,
        Priority: req.body.priority
    }, {
        where: {Id: id}
    })
    res.send({success: "Successfully update"});
});

// Get list of all notes under specific todo
route.get('/:id/notes', async (req, res) => {
    const id = parseInt(req.params.id);
    const tasks = await Notes.findAll({where: {TaskId: id}})
    res.send(tasks)
});

// Add a new note under specific todo
route.post('/:id/notes', async (req, res) => {
    const id = parseInt(req.params.id);

    if (typeof req.body.params === 'string') {
        return res.status(400).send({
            error: 'Task name not provided'
        })
    }
    
    const newTask = await Notes.create({
        Body: req.body.body,
        TaskId: id,
    })
    res.status(201).send({
        success: 'New Note added'
    })

});

module.exports = route