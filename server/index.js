const express = require('express');
const mongoose = require('mongoose');
let app = express();
const {getReviewsById, getReviews, createReview, deleteReview, updateReview} = require('../database/index');
var cors = require('cors')


let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../public'));
app.use(cors());

//get request to pull all of the review data onto the page
app.get('/reviews', function(req, res) {
  getReviews({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  })
});


// Read one review
app.get('/reviews/:id', (req, res) => {

  getReviewsById(req.params.id, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      res.sendStatus(404);
    }
  });
});


app.post('/reviews', (req, res) => {
  createReview(req.body, (err, data) => {
    if (err) {
      console.log(err)
      res.sendStatus(400);
    } else {
      res.status(201).json(data);
    }
  });
});

app.delete('/reviews/:id', (req, res) => {

  deleteReview(req.params.id, (err, result) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
      console.log('Review Deleted')
    }
  });
});

app.put('/reviews/:id', function (req, res){
  updateReview(req, res)
})












// // Delete one review
// app.delete('/reviews/:id', (req, res) => {

//   Review.deleteOne(req.params._id, (err, result) => {
//     if (err) {
//       res.sendStatus(404);
//     } else {
//       res.sendStatus(204);
//       console.log('Review Deleted')
//     }
//   });
// });

// //Update one review    TODO
// app.put('/reviews/:id', (req, res) => {
//   console.log(req.params)
//   Review.findByIdAndUpdate({_id:req.params.id}, req.body, (err, review) => {
//     if (review) {
//       res.status(200).json(review);
//     } else {

//       res.sendStatus(404);
//     }
//   });
// });

// //Create Review
// app.post('/reviews', (req, res) => {

//   // let review = new Review(req.body)
//   // Review.save()
//   //const review = new db.Review;
//   Review.create(req.body, (err, data) => {
//     if (err) {
//       console.log(err)
//       res.sendStatus(400);
//     } else {
//       res.status(201).json(data);
//     }
//   });
// });

let port = process.env.PORT || 3003;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = app;