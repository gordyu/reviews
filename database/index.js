const {Pool} = require('pg')
const pool = new Pool({
  user: 'ignacio',
  host: 'localhost',
  database: 'reviews',
  password: 'password',
  port: 5432,
})

pool.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

// First in order to drop the table run
// drop table reviews
// then run
// CREATE TABLE IF NOT EXISTS
// reviews(
//   id SERIAL PRIMARY KEY,
//   imagePath VARCHAR(240) NOT NULL,
//   name VARCHAR(70) NOT NULL,
//   review VARCHAR(300) NOT NULL,
//   accuracyRating DECIMAL (4,3) NOT NULL,
//   communicationRating DECIMAL (4,3) NOT NULL,
//   cleanlinessRating DECIMAL (4,3) NOT NULL,
//   locationRating DECIMAL (4,3) NOT NULL,
//   checkinRating DECIMAL (4,3) NOT NULL,
//   valueRating DECIMAL (4,3) NOT NULL,
// postDate VARCHAR (20)
// );


const getReviews = function (req, res) {
   pool.query('SELECT * FROM reviews ORDER BY id ASC fetch first 12 rows only', (error, results)=> {
     if (error) {
       throw error
     }
  //  console.log( res)
     res.json(results.rows)
   })
  //console.log(results.rows)
}

const createReview = function (req, res) {
  pool.query('INSERT INTO reviews (imagePath, name, postDate, review, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkinRating, valueRating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',  [req.imagePath, req.name, req.review, req.accuracyRating, req.communicationRating, req.cleanlinessRating, req.locationRating, req.checkinRating, req.valueRating, req.postDate])
    .then(res => {
     console.log(res.rows[0])
    })
    .catch(e => console.error(e.stack))
}

const deleteReview = function (req, res) {

  const id = parseInt(req)
  pool.query('DELETE FROM reviews WHERE id = $1 RETURNING *', [id])
  .then(res =>{
    console.log(res)
  })
  .catch (e => { console.error(e.stack)})
}

  const updateReview = function (req, res) {
  const id = parseInt(req.params.id)
  pool.query(
    'UPDATE reviews SET imagePath = $1, name = $2, postDate = $3, review = $4, accuracyRating = $5, communicationRating = $6, cleanlinessRating = $7, locationRating = $8, checkinRating = $9, valueRating = $10  WHERE id = $11',
    [req.body.imagePath, req.body.name,  req.body.review, req.body.accuracyRating, req.body.communicationRating, req.body.cleanlinessRating, req.body.locationRating, req.body.checkinRating, req.body.valueRating, req.body.postDate, id])
    .then(res => {
      console.log(res, 'Updating successful')
     })
    .catch(e => console.error(e.stack))
}

const getReviewsById = function (req, res) {
  const id = parseInt(req.params.id)
  console.log(Date())
  var startTime = Date.now();

  pool.query('SELECT * FROM reviews WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    console.log(Date.now()- startTime)
    console.log(Date())
    console.log(results.rows)
    res.json(results.rows)
  })
}


const fileLoader = (table, filepath, callback) => {
	pool.query(`COPY ${table} FROM '${filepath}';`, (err, resp) => {
		callback(err, resp)
	})
}


module.exports = {
   getReviews,
   createReview,
   getReviewsById,
   updateReview,
   deleteReview,
   pool,
   fileLoader
}
