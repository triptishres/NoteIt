const Todo = require("../models/todo");
const todoRoutes = require("express").Router();


// Todo Routes
todoRoutes.route('/').get( (req,res) => {
    Todo.find((err, todos) => {
        if(err)
            console.log(err);
        else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get((req,res) => {
    const id = req.params.id;
    Todo.findById(id, (err,todo) => {
        res.json(todo);
    });
});

todoRoutes.route('/add').post((req,res) => {
    const todo = new Todo(req.body);
    todo.save()
        .then( todo => {
            res.status(200).json('Task added successfully');
        })
        .catch( err => {
            res.status(400).send('Adding new task failed');
        });
});

todoRoutes.route('/update/:id').post((req,res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(!todo)
            res.status(404).send('Task not found');
        else {
            todo.todo_description = req.body.todo_description;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
            todo.save().then( todo => {
                res.json('Task is updated');
            })
            .catch( err => {
                res.status(400).send("Task failed to update");
            });
        }
    });
});
module.exports = todoRoutes;

