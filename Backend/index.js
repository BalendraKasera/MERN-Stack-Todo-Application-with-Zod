const express = require("express");
const { createTODO, updateTODO } = require("./type");
const { todo } = require("./database");
const app = express();
const cors=require("cors");

app.use(express.json());
app.use(cors())

app.post("/todo", async function (req, res) {
    const createPayLoad = req.body;
    const parsedPayLoad = createTODO.safeParse(createPayLoad);
    if (!parsedPayLoad.success) {
        res.status(411).json({
            msg: "you sent a wrong inputs",
        });
        return;
    }
    //put it in mongodb
    await todo.create({
        title: createPayLoad.title,
        description: createPayLoad.description,
        completed: false,
    });
    res.json({
        msg: "TODO Created",
    });
});

app.get("/todos", async function (req, res) {
    const todos = await todo.find({});
    res.json({
        todos,
    });
});

app.put("/completed", async function (req, res) {
    const updatePayLoad = req.body;
    const parsedPayLoad = updateTODO.safeParse(updatePayLoad);
    if (!parsedPayLoad.success) {
        res.status(411).json({
            msg: "you sent a wrong id inputs",
        });
        return;
        //put it in mongodb
    }

    await todo.update(
        {
            _id: req.body.id,
        },
        {
            completed: true,
        }
    );
    res.json({
        msg: "Todo marked as completed",
    });
});

app.listen(3000);
