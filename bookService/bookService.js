let express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

let bookController = require('./bookController');

//start body-parser configuration
router.use(bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

/**
 * return a collection the books that matched with parameter
 */
router.get('/:parameter/:pageNumber',bookController.getBooksMatched);


/**
 * return a single book that matched with title
 */
//router.get('/:title',bookController.getBookMatched);


module.exports = router;