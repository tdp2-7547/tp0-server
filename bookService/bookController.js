let bookAccessApi = require('./bookAccessApi');
const DTOBookHeader = require('./DTOBookHeader');

function getBooksMatched(req, res, next){
    var parameter = req.params.parameter;
    var pageNumber = req.params.pageNumber;

    pageNumber = pageNumber || 0;
    parameter = parameter || "";

    if(pageNumber < 0){
        res.status(400).send("error");
    }

    if(parameter === ""){
        res.status(400).send("error");
    }

    if (process.env.NODE_ENV == 'test'){
        //to do mock...
        var mock = [];
        for(i=0;i<3;i++){mock.push(new DTOBookHeader())}
        res.status(200).send(mock);
    }else{
        bookAccessApi.getBooksMatched(parameter,pageNumber)
        .then(
            function(error){
                res.status(400).send(error);
            },
            function(response){
                res.status(200).send(response);
            }
        )
    }

    console.log("sending books");
}

module.exports = {
    getBooksMatched
}