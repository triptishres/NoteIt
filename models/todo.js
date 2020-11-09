const mongoose = require('mongoose');

const Schema = new mongoose.Schema;

const todosSchema = new mongoose.Schema({
    todo_description: {
        type: String
    },
    todo_priority: {
        type: String
    },
    todo_completed: {
        type: Boolean
    }
}); 

const Todo = mongoose.model("Todo", todosSchema);
module.exports = Todo;

