//This is postgres

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true })
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.log('error'));

let reviewSchema = mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  imagePath: {type: String, required: true},
  name: {type: String, required: true},
  postDate: {type: Number, required: true},
  review: {type: String, required: true},
  accuracyRating: {type: Number, required: true},
  communicationRating: {type: Number, required: true},
  cleanlinessRating: {type: Number, required: true},
  locationRating: {type: Number, required: true},
  checkinRating: {type: Number, required: true},
  valueRating: {type: Number, required: true}
});

let Review = mongoose.model('Review', reviewSchema);


// let save = (review) => {
//   //review =JSON.parse(review);
//   console.log(typeof review);
//   let newReview = new Review({
//     imagePath: review.imagePath,
//     name:review.name,
//     postDate: review.postDate,
//     review: review.review,
//     accuracyRating: review.accuracyRating,
//     communicationRating: reciew.communicationRating,
//     cleanlinessRating: review.cleanlinessRating,
//     locationRating: review.locationRating,
//     checkinRating: review.checkinRating,
//     valueRating: review.valueRating,
//   })
// }


// module.exports.save = save;
module.exports.Review = Review;