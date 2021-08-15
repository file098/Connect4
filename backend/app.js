const express = require("express");
const app = express();
const mongoose = require("./database/mongoose");
const List = require("./database/modules/list");
const Task = require("./database/modules/task");
const { findById } = require("./database/modules/list");

app.use(express.json());

/* 
Questo metodo è l'equivalente di:
http://localhost:3000/lists -- che ritorna --> [ {ArraydiList} ]
*/
app.get("/lists", (req, res) => {
    List.find({})
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
});

/* Richiesta per un solo elemento con il parametro nella chiamata */
app.get("/lists/:listId", (req, res) => {
    List.findById({ _id: req.params.listId })
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
});

app.post("/", (req, res) => {
    new List({ title: req.body.title })
        .save()
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
});

app.patch("/lists/:listId", (req, res) => {
    List.findOneAndUpdate({ _id: req.params.listId }, { $set: req.body })
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
});

app.delete("/lists/:listId", (req, res) => {
    List.findByIdAndDelete(req.params.listId)
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
});

/* CRUD for tasks based on the list which they are part of */
app.get("/lists/:listId/tasks", (req, res) => {
    Task.findById({ _listId: res.params.listId })
        .then((lists) => res.send(lists))
        .catch((error) => console.log(error));
});

app.post("lists/:listsId/tasks/", (req, res) => {
    new Task({ title: req.body.title, "_listId": req.params.listId })
        .save()
        .then((lists) => res.send(lists))
        .catch((error) => console.log(error));
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"),
        res.header(
            "Access-Control-Allow-Methods",
            "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
        );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Required-With, Content-Type, Accept"
    );
    next();
});

app.listen(3000, () => console.log("Server is Connected on port 3000"));
