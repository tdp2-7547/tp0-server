const request = require('request');
const DTOBookHeader = require('./DTOBookHeader');
const MAX_ITEMS = 10;

function getBooksMatched(parameter,pageNumber){

    var dtoBooksHeader = [];
    var promise = new Promise(function(reject,resolve){

        var allFilters = '&filter=ebooks&filter=full&filter=partial'
        request('https://www.googleapis.com/books/v1/volumes?q='+parameter+'&startIndex='+pageNumber*MAX_ITEMS+'&orderBy=relevance'+allFilters, { json: true }, (error, response, body) => {
            if (error) { reject(error) }

            var items = JSON.parse(JSON.stringify(body.items));
            //console.log("############");
            //console.log(items);
            var linkDownloadPDF = "";
            var linkDownloadEpub = "";
            for (var i = 0; i < items.length; i++) {
                var dtoBookHeader = new DTOBookHeader();
                dtoBookHeader.title = (items[i].volumeInfo.title === undefined) ? "" : items[i].volumeInfo.title;
                dtoBookHeader.description = (items[i].volumeInfo.description === undefined) ? "" : items[i].volumeInfo.description;
                dtoBookHeader.authores = (items[i].volumeInfo.authors === undefined) ? "" : items[i].volumeInfo.authors;
                dtoBookHeader.categories = (items[i].volumeInfo.categories === undefined) ? "" : items[i].volumeInfo.categories;
                dtoBookHeader.linkImage = (items[i].volumeInfo.imageLinks.smallThumbnail === undefined) ? "" : items[i].volumeInfo.imageLinks.smallThumbnail;
                linkDownloadPDF = (items[i].accessInfo.pdf.downloadLink === undefined) ? "" : items[i].accessInfo.pdf.downloadLink;
                linkDownloadEpub = (items[i].accessInfo.epub.downloadLink === undefined) ? "" : items[i].accessInfo.epub.downloadLink;
                dtoBookHeader.idBook = (items[i].id === undefined) ? "" : items[i].id;
                dtoBookHeader.isAvailableFreePDF = Boolean(linkDownloadPDF);
                dtoBookHeader.isAvailableFreeEpub = Boolean(linkDownloadEpub);
                dtoBookHeader.linkDownloadPDF = linkDownloadPDF;
                dtoBookHeader.linkDownloadEpub = linkDownloadEpub;
//                if(dtoBookHeader.isAvailableFreeEpub || dtoBookHeader.isAvailableFreePDF)
                let position = dtoBookHeader.description.indexOf('.');
                dtoBookHeader.description = dtoBookHeader.description.substr(0,position);
                dtoBooksHeader.push(dtoBookHeader);
                //console.log(dtoBookHeader);
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
