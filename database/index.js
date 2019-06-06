//This is postgres

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ignacio',
  host: 'localhost',
  database: 'reviews',
  password: 'password',
  port: 5432,
})
const getReviews = (request, response) => {
  pool.query('SELECT * FROM reviews ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getReviewsById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM reviews WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createReview = (request, response) => {
  const { imagePath, name, postDate, review, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkinRating, valueRating } = request.body

  pool.query('INSERT INTO reviews (imagePath, name, postDate, review, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkinRating, valueRating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [imagePath, name, postDate, review, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkinRating, valueRating], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

const updateReview = (request, response) => {
  const id = parseInt(request.params.id)
  const { imagePath, name, postDate, review, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkinRating, valueRating } = request.body

  pool.query(
    'UPDATE reviews SET imagePath = $1, name = $2, postDate = $3, review = $4, accuracyRating = $5, communicationRating = $6, cleanlinessRating = $7, locationRating = $8, checkinRating = $9, valueRating = $10  WHERE id = $3',
    [imagePath, name, postDate, review, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkinRating, valueRating, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Review modified with ID: ${id}`)
    }
  )
}

const deleteReview = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM reviews WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Review deleted with ID: ${id}`)
  })
}

module.exports = {
  getReviews,
  getReviewsById,
  createReview,
  updateReview,
  deleteReview,
}














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