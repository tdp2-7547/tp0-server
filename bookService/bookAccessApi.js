const request = require('request');
const DTOBookHeader = require('./DTOBookHeader');
const MAX_ITEMS = 10;

function getBooksMatched(parameter,pageNumber){

    var dtoBooksHeader = [];
    var promise = new Promise(function(reject,resolve){

        request('https://www.googleapis.com/books/v1/volumes?q='+parameter+'&startIndex='+pageNumber*MAX_ITEMS+'&orderBy=relevance', { json: true }, (error, response, body) => {
            if (error) { reject(error) }

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
            response = dtoBooksHeader;
            resolve(response);
        });

    });

    return promise;
}

module.exports = {
    getBooksMatched
}