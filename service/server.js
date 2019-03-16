const express = require("express");
const app = express();
const PORT=3000;
const bookService = require('../bookService/bookService');
var morgan = require('morgan');


if (process.env.NODE_ENV !== 'test'){
    app.use(morgan("default"));
}

app.use('/books',bookService);

app.listen(PORT, ()=> {
    console.log("Listening to the port", PORT);
})

process.on('uncaughtException', (err) => {
    console.log("========Uncaught exception========");
    console.log(err);
});

module.exports = app;