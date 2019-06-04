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


// Read one review
app.get('/reviews/:id', (req, res) => {
  db.Review.findById(req.params.id, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      res.sendStatus(404);
    }
  });
});

// Delete one review
app.delete('/reviews/:id', (req, res) => {

  db.Review.deleteOne(req.params._id, (err, result) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
      console.log('Review Deleted')
    }
  });
});

// Update one review    TODO
// app.put('/reviews/:id', (req, res) => {
//   db.Review.findByIdAndUpdate(req.params.id, req.body.todoText, (err, todo) => {
//     if (todo) {
//       res.status(200).json(todo);
//     } else {
//       res.sendStatus(404);
//     }
//   });
// });

// Create Review
// app.post('/reviews', (req, res) => {
//   db.Review.create(req.body.todoText, (err, review) => {
//     if (err) {
//       res.sendStatus(400);
//     } else {
//       res.status(201).json(review);
//     }
//   });
// });

let port = 3003;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = app;