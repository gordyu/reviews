//This is postgres

const {Client} = require('pg')
const client = new Client({
  user: 'ignacio',
  host: 'localhost',
  database: 'reviews',
  password: 'password',
  port: 5432,
})

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})
// client.connect()
//   .then(()=> {console.log('Successfully connected to database');})
//   .then()
//   .catch((err)=> {console.log(err);})
//   .finally(() => client.end())


// const createTables = () => {
//   const queryText =
//     `CREATE TABLE IF NOT EXISTS
//       reviews(
//         id SERIAL PRIMARY KEY,
//         imagePath VARCHAR(240) NOT NULL,
//         name VARCHAR(70) NOT NULL,
//         postDate TIMESTAMP,
//         review VARCHAR(300) NOT NULL,
//         accuracyRating INT NOT NULL,
//         communicationRating INT NOT NULL,
//         cleanlinessRating INT NOT NULL,
//         locationRating INT NOT NULL,
//         checkinRating INT NOT NULL,
//         valueRating INT NOT NULL
//       )`;


//   client.query(queryText)
//     .then((res) => {
//       console.log(res, 'this comes from create DB');
//       client.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       client.end();
//     });
// }

// const getReviews = function (req, res) {
//   client.connect({}, function (err,client, done) {
//     if (err) {
//       return console.error('error fetching from pool', err);
//     } else {

//       client.query('SELECT * FROM reviews ORDER BY id ASC', function (error, results) {
//         if (error) {
//           throw error
//         }
//         console.log(results.rows)
//       })
//     }
//   })
// }


const getReviews = function (req, res) {
  client.query('SELECT * FROM reviews ORDER BY id ASC')
  .then(res => console.log(res.rows))
  .catch(e => console.error(e.stack))
}

const createReview = function (req, res) {
  // const { imagePath, name, postDate, review, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkinRating, valueRating } = req.body
  client.query('INSERT INTO reviews (imagePath, name, postDate, review, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkinRating, valueRating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',  [req.imagePath, req.name, req.postDate, req.review, req.accuracyRating, req.communicationRating, req.cleanlinessRating, req.locationRating, req.checkinRating, req.valueRating])
    .then(res => {
     console.log(res.rows[0])
  })
  .catch(e => console.error(e.stack))

}



// const createReview = function (req, res) {
//   const { imagePath, name, postDate, review, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkinRating, valueRating } = req.body

//   client.query('INSERT INTO reviews (imagePath, name, postDate, review, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkinRating, valueRating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [imagePath, name, postDate, review, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkinRating, valueRating], (error, result) => {
//     if (error) {
//       throw error
//     }
//     res.send(201).send(`User added with ID: ${result.insertId}`)
//   })
// }





// const getReviewsById = function (req, res) {
//   const id = parseInt(req.params.id)

//   client.query('SELECT * FROM reviews WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     res.send(200).json(results.rows)
//   })
// }

// const createReview = function (req, res) {
//   const { imagePath, name, postDate, review, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkinRating, valueRating } = req.body

//   client.query('INSERT INTO reviews (imagePath, name, postDate, review, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkinRating, valueRating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [imagePath, name, postDate, review, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkinRating, valueRating], (error, result) => {
//     if (error) {
//       throw error
//     }
//     res.send(201).send(`User added with ID: ${result.insertId}`)
//   })
// }

// const updateReview = function (req, res) {
//   const id = parseInt(req.params.id)
//   const { imagePath, name, postDate, review, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkinRating, valueRating } = req.body

//   client.query(
//     'UPDATE reviews SET imagePath = $1, name = $2, postDate = $3, review = $4, accuracyRating = $5, communicationRating = $6, cleanlinessRating = $7, locationRating = $8, checkinRating = $9, valueRating = $10  WHERE id = $3',
//     [imagePath, name, postDate, review, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkinRating, valueRating, id],
//     (error, results) => {
//       if (error) {
//         throw error
//       }
//       res.status(200).send(`Review modified with ID: ${id}`)
//     }
//   )
// }

// const deleteReview = function (req, res) {
//   const id = parseInt(req.params.id)

//   client.query('DELETE FROM reviews WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     res.send(200).send(`Review deleted with ID: ${id}`)
//   })
// }



module.exports = {
   getReviews,
   createReview,
}
//   getReviewsById,
//   updateReview,
//   deleteReview,
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
// module.exports.Review = Review;