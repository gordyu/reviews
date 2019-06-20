require('newrelic');
const express = require('express');
const mongoose = require('mongoose');
let app = express();
const db = require('../database/index');
var cors = require('cors')


let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../public'));
app.use(cors());

app.post('/reviews', (req, res) => {
  db.createReview(req.body, (err, data) => {
    if (err) {
      console.log(err)
      res.sendStatus(400);
    } else {
      res.status(201).json(data);
    }
  });
});


app.delete('/reviews/:id', (req, res) => {

  db.deleteReview(req.params.id, (err, result) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
      console.log('Review Deleted')
    }
  });
});

app.get('/reviews/', function (req,res) {
  db.getReviews(req, res)
})

app.get('/reviews/:id', function (req,res) {
  db.getReviewsById(req, res)
})

app.put('/reviews/:id', function (req, res){
  db.updateReview(req, res)
})



let port = process.env.PORT || 3003;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = app;