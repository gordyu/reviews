// const {reviews} = require('./reviews');
// const pgp = require('pg-promise');
// const fs = require('fs')

// const cn = {
//   user: 'ignacio',
//   host: 'localhost',
//   database: 'reviews',
//   password: 'password',
//   port: 5432,
// }

// const reviewDB = pgp(cn)

// const cs = new pgp.helpers.ColumnSet([
//   '?id',
//   'list:csv',
//   {
//     name: 'imagePath',
//     prop: 'imagePath',
//     def: null
// },
// {
//   name: 'name',
//   prop: 'name',
//   def: null
// },
// {
//   name: 'postDate',
//   prop: 'postDate',
//   def: null
// },
// {
//   name: 'review',
//   prop: 'review',
//   def: null
// },
// {
//   name: 'accuracyRating',
//   prop: 'accuracyRating',
//   def: null
// },
// {
//   name: 'communicationRating',
//   prop: 'communicationRating',
//   def: null
// },
// {
//   name: 'cleanlinessRating',
//   prop: 'cleanlinessRating',
//   def: null
// },
// {
//   name: 'locationRating',
//   prop: 'locationRating',
//   def: null
// },
// {
//   name: 'checkinRating',
//   prop: 'checkinRating',
//   def: null
// },
// {
//   name: 'valueRating',
//   prop: 'valueRating',
//   def: null
// }, {table: 'reviews'}
// ])

// const data = fs.readFile('./database.csv')
//   .then(data)
//   .catch(err);



// reviewDB.txMode('massive-insert', t => {
//   return t.sequence(index => {
//     return getNextData(t, index)
//       .then(data => {
//         if (data) {
//           const insert = pgp.helpers.insert(data, cs);
//           return t.none(insert)
//         }
//       })
//   })
// })
// .then(data => {
//   // COMMIT has been executed
//   console.log('Total batches:', data.total, ', Duration:', data.duration);
// })
// .catch(error => {
//   // ROLLBACK has been executed
//   console.log(error);
// });

