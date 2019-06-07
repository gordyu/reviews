const cassandra = require('cassandra-driver');



const client = new cassandra.Client({ contactPoints: ['h1', 'h2'], localDataCenter: 'datacenter1', keyspace: 'ks1' });

const query = 'SELECT name, email FROM users WHERE key = ?';
client.execute(query, [ 'someone' ])
  .then(result => console.log('User with email %s', result.rows[0].email));




  // CREATE KEYSPACE grocery WITH REPLICATION = {'class' : 'SimpleStrategy','replication_factor' : 1};

  // CREATE TABLE IF NOT EXISTS grocery.fruit_stock (item_id TEXT, name TEXT, price_p_item DECIMAL, PRIMARY KEY (item_id));

  // INSERT INTO grocery.fruit_stock (item_id, name, price_p_item) VALUES ('a0','apples',0.50);
  // INSERT INTO grocery.fruit_stock (item_id, name, price_p_item) VALUES ('b1','bananas',0.40);
  // INSERT INTO grocery.fruit_stock (item_id, name, price_p_item) VALUES ('c3','oranges',0.35);
  // INSERT INTO grocery.fruit_stock (item_id, name, price_p_item) VALUES ('d4','pineapples',2.5);








// const mongoose = require('mongoose');
// mongoose.set('useCreateIndex', true);
// mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true })
//         .then(() => console.log('MongoDB connected...'))
//         .catch(err => console.log('error'));

// let reviewSchema = mongoose.Schema({
//   id: {type: Number, required: true, unique: true},
//   imagePath: {type: String, required: true},
//   name: {type: String, required: true},
//   postDate: {type: Number, required: true},
//   review: {type: String, required: true},
//   accuracyRating: {type: Number, required: true},
//   communicationRating: {type: Number, required: true},
//   cleanlinessRating: {type: Number, required: true},
//   locationRating: {type: Number, required: true},
//   checkinRating: {type: Number, required: true},
//   valueRating: {type: Number, required: true}
// });

// let Review = mongoose.model('Review', reviewSchema);


// // let save = (review) => {
// //   //review =JSON.parse(review);
// //   console.log(typeof review);
// //   let newReview = new Review({
// //     imagePath: review.imagePath,
// //     name:review.name,
// //     postDate: review.postDate,
// //     review: review.review,
// //     accuracyRating: review.accuracyRating,
// //     communicationRating: reciew.communicationRating,
// //     cleanlinessRating: review.cleanlinessRating,
// //     locationRating: review.locationRating,
// //     checkinRating: review.checkinRating,
// //     valueRating: review.valueRating,
// //   })
// // }


// // module.exports.save = save;
// module.exports.Review = Review;