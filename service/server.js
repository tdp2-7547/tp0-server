const express = require("express");
const app = express();
const PORT=3000;
const bookService = require('../bookService/bookService');
var morgan = require('morgan');
var cors = require('cors');


if (process.env.NODE_ENV !== 'test'){
    app.use(morgan("default"));
}

//Enable all cors request
app.use( cors() );

app.use('/books',bookService);


app.listen(PORT, ()=> {
    console.log("Listening to the port", PORT);
})

process.on('uncaughtException', (err) => {
    console.log("========Uncaught exception========");
    console.log(err);
});

module.exports = app;
