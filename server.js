const express = require("express");
const app = express();
const PORT=3000;

app.get("/books/", (req,res) => {
    res.send("sending books");
    console.log("sending books");
});

app.listen(PORT, ()=> {
    console.log("Listening to the port", PORT);
})

process.on('uncaughtException', (err) => {
    console.log("========Uncaught exception========");
    console.log(err);
});