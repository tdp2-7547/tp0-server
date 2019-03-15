const express = require("express");
const app = express();
const PORT=3000;
const request = require('request');
const DTOBookHeader = require('../DTOBookHeader');
const MAX_ITEMS = 10;



console.log(process.env.NODE_ENV);



app.get("/books/:parameter/:pageNumber", (req,res) => {
    var parameter = req.params.parameter;
    var pageNumber = req.params.pageNumber;
    var dtoBooksHeader = [];
    request('https://www.googleapis.com/books/v1/volumes?q='+parameter+'&startIndex='+pageNumber*MAX_ITEMS+'&orderBy=relevance', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        var items = JSON.parse(JSON.stringify(body.items));
        for (var i = 0; i < items.length; i++) {
            var dtoBookHeader = new DTOBookHeader();
            dtoBookHeader.title = (items[i].volumeInfo.title === undefined) ? "" : items[i].volumeInfo.title;
            dtoBookHeader.description = (items[i].volumeInfo.description === undefined) ? "" : items[i].volumeInfo.description;
            dtoBookHeader.authores = (items[i].volumeInfo.authors === undefined) ? "" : items[i].volumeInfo.authors;
            dtoBookHeader.categories = (items[i].volumeInfo.categories === undefined) ? "" : items[i].volumeInfo.categories;
            console.log(dtoBookHeader.title);
            dtoBooksHeader.push(dtoBookHeader);
        }
        console.log(dtoBooksHeader);
        res.status(200).send(dtoBooksHeader);
    });
    console.log("sending books");
});

app.listen(PORT, ()=> {
    console.log("Listening to the port", PORT);
})

process.on('uncaughtException', (err) => {
    console.log("========Uncaught exception========");
    console.log(err);
});

module.exports = app;