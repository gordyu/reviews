const cassandra = require('cassandra-driver');

const client = new cassandra.Client({contactPoints: ['127.0.0.1'],  localDataCenter: 'datacenter1', keyspace: 'reviews'});

client.connect(function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('connected successfully')
  };
});


const deleteReview = function (req, res) {
  const id = parseInt(req);
  const query = 'DELETE FROM reviews WHERE id = 1';
  client.execute(query, function (err, result) {
    if (err ) {
      console.log(err)
    }
    console.log(result);
  });
}




const getReviewsById = function (req, res) {
  console.log(Date.now())
  var startTime = Date.now();
  const id = parseInt(req)
  const query = `SELECT * FROM reviews WHERE id = ${id}`;
  client.execute(query, function (err, result) {
    console.log(Date.now()- startTime)
    console.log(Date.now())
   console.log(result);
 });
}

const getReviews = function (req, res) {
  const query = 'SELECT * FROM reviews';
  client.execute(query, function (err, result) {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
    }
  })
}

const createReview = function (req, res) {
  const query = 'INSERT INTO reviews (id, imagePath, name, postDate, review, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkinRating, valueRating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  const params = [req.id, req.imagePath, req.name, req.postDate, req.review, req.accuracyRating, req.communicationRating, req.cleanlinessRating, req.locationRating, req.checkinRating, req.valueRating]
  client.execute(query, params, { prepare: true }, function (err, result){
    if (err) {
      console.log(err)
    } else {
      console.log(result)
    }
  })
}

  const updateReview = function (req, res) {
  const id = parseInt(req.params.id)
  const query = `UPDATE reviews SET imagePath = ?, name = ?, postDate = ?, review = ?, accuracyRating = ?, communicationRating = ?, cleanlinessRating = ?, locationRating = ?, checkinRating = ?, valueRating = ?  WHERE id = ?`;
  const params = [req.body.imagePath, req.body.name, req.body.postDate, req.body.review, req.body.accuracyRating, req.body.communicationRating, req.body.cleanlinessRating, req.body.locationRating, req.body.checkinRating, req.body.valueRating, id]
  client.execute(query, params,  { prepare: true },function (err, res) {
    if (err) {
      console.log (err)
    }
    console.log (res)
  })
}



 module.exports = {
    getReviews,
    createReview,
    getReviewsById,
    updateReview,
    deleteReview,
 }

























// const getReviewsById = function (req, res) {
//   const id = parseInt(req.params.id)

//   client.query('SELECT * FROM reviews WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     res.send(200).json(results.rows)
//   })
// }











// const query = 'SELECT name, email FROM users WHERE key = ?';
// client.execute(query, [ 'someone' ])
//   .then(result => console.log('User with email %s', result.rows[0].email));


// const query = "SELECT name, email, birthdate FROM users WHERE key = 'mick-jagger'";
// client.execute(query, function (err, result) {
//   var user = result.first();
//   //The row is an Object with column names as property keys.
//   console.log('My name is %s and my email is %s', user.name, user.email);
// });











  // const getReviews = function (req, res) {
  //   client.query('SELECT * FROM reviews ORDER BY id ASC')
  //   .then(res => console.log(res.rows))
  //   .catch(e => console.error(e.stack))
  // }

  // const createReview = function (req, res) {
  //   client.query('INSERT INTO reviews (imagePath, name, postDate, review, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkinRating, valueRating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',  [req.imagePath, req.name, req.postDate, req.review, req.accuracyRating, req.communicationRating, req.cleanlinessRating, req.locationRating, req.checkinRating, req.valueRating])
  //     .then(res => {
  //      console.log(res.rows[0])
  //     })
  //     .catch(e => console.error(e.stack))
  // }

  // const deleteReview = function (req, res) {

  //   const id = parseInt(req)
  //   client.query('DELETE FROM reviews WHERE id = $1 RETURNING *', [id])
  //   .then(res =>{
  //     console.log(res)
  //   })
  //   .catch (e => { console.error(e.stack)})
  // }

  //   const updateReview = function (req, res) {
  //   const id = parseInt(req.params.id)
  //   client.query(
  //     'UPDATE reviews SET imagePath = $1, name = $2, postDate = $3, review = $4, accuracyRating = $5, communicationRating = $6, cleanlinessRating = $7, locationRating = $8, checkinRating = $9, valueRating = $10  WHERE id = $11',
  //     [req.body.imagePath, req.body.name, req.body.postDate, req.body.review, req.body.accuracyRating, req.body.communicationRating, req.body.cleanlinessRating, req.body.locationRating, req.body.checkinRating, req.body.valueRating, id])
  //     .then(res => {
  //       console.log(res, 'Updating successful')
  //      })
  //     .catch(e => console.error(e.stack))
  // }
























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