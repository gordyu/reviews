const express = require('express');
let app = express();
const db = require('../database/index');
var cors = require('cors')


let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));
app.use(cors());

//get request to pull all of the review data onto the page 
app.get('/reviews', function(req, res) {
  db.Review.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  })
  .catch(err => {
    console.error("error ", err);
    res.status(400).json({err});  
  }); 
});


let port = 3003;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = app;