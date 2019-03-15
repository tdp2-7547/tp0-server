const express = require("express");
const app = express();
const PORT=3000;
const request = require('request');

app.get("/books/:parameter", (req,res) => {
    var parameter = req.params.parameter;
    request('https://www.googleapis.com/books/v1/volumes?q='+parameter, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    var items = body.items;
    console.log(items);
    });
    res.send("sending books " + parameter);
    console.log("sending books");
});

app.listen(PORT, ()=> {
    console.log("Listening to the port", PORT);
})

process.on('uncaughtException', (err) => {
    console.log("========Uncaught exception========");
    console.log(err);
});