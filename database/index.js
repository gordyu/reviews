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
});

let Review = mongoose.model('Review', reviewSchema);

module.exports.Review = Review;