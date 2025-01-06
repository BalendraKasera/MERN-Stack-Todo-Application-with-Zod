const mongoose = require("mongoose");
const zod = require("zod");

mongoose.connect(
    "mongodb+srv://balendra77:balendramongodb@cluster0.yv6gc.mongodb.net/"
);

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
    todo: todo,
};
