var db = require('../database/index');
const mongoose = require('mongoose');
const faker = require ('faker');
const fs = require('fs')
const path = require('path')



/*
seed database in this file
utilize the insertMany mongodb method
*/
const randomElement = function(array) {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
//create random username
const names = [
  'Linda',
  'Bob',
  'Maira',
  'Jade',
  'Gloria',
  'Joan',
  'Mike',
  'Taylor',
  'Tiffany',
  'Leslie',
  'Courtney',
  'Scott',
  'Jerry',
  'Zachary',
  'Alfred',
  'Cam',
  'Sarkis',
  'Robin',
  'Cody',
  'Hailey',
  'Kyle',
  ];

//way to create randomly generated reviews
const opening = [
  'A beautiful and spectacular location with',
  'Perfect sunny villa in spain with',
  'Abysmal looking inside and out but',
  'A dreadful experience through and through with',
  'Disgusting and dreadful appliances with',
  'Wonderful and went above and beyond my expectations including a',
  'Fantastic and would highly recommend staying here',
  'Great and interesting location with plenty of things nearby to explore',
  'Our stay was great and', 'Modern and contemporary furnishings with a',
  'Comfortable and spacious rooms and',
  'Spectacular patio view and friendly host and'
];

const nouns = [
  'kitchen',
  'bedroom',
  'garage',
  'bathtub',
  'red keep',
  'throne room',
  'iron throne',
  'crawl space',
  'attic',
  'shed',
  'dungeon',
  'sky door',
  'childrens room',
  'weirwood tree',
  'living-room space',
  'infinity pool',
  'hot-tub',
  'home-theatre',
  'backyard',
  'toilet',
  'gazebo',
  'closet',
  'shower',
  'garbage can',
];

const objects = [
  'well-lit',
  'inviting',
  'majestic',
  'interesting looking',
  'quiet',
  'memorable',
  'exciting',
  'giant',
  'inspiring',
  'indescribable',
  'picture perfect',
  'and best ever',
  'and down right terrible'
];
const verbs = [
  'clown themed',
  'spaghetti themed',
  'brightly colored',
  'charming', 'cozy',
  'clean',
  'well organized',
  'extremely luxurious',
  'peaceful', 'rustic',
  'delightful',
  'horribly smelly',
  'wonderfully comfortable',
  'with a retreat nearby',
  'shopping nearby',
  'nightclubs nearby',
  'magical creatures nearby'
];

let randomReview = function() {
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns)].join(' ');
};
let randomName = function() {
  return randomElement(names);
}
let randomRating = function () {
  let rating = Math.random() * (5 - 2) + 2;
  let roundedRating = rating.toFixed(3);
  return roundedRating;
}

// let storageArr = [];
// //create array of messages data
//   for (let i = 0; i < 100000; i++) {
//     storageArr.push(new db.Review({
//       id: i,
//       imagePath: 'placeholder',
//       name: faker.name.firstName(),
//       postDate: 2019,
//       review: faker.lorem.paragraph(),
//       accuracyRating: randomRating(),
//       communicationRating: randomRating(),
//       cleanlinessRating: randomRating(),
//       locationRating: randomRating(),
//       checkinRating: randomRating(),
//       valueRating: randomRating()
//     }));
// };


const csvFile = path.join(__dirname, "./SeedFile/database.tsv");

const totalEntries = 10000000

const entryObject = (i) => {
  let seedingObj = {
    imagePath: 'placeholder',
    name: faker.name.firstName(),
    review: faker.lorem.paragraph(),
    accuracyRating: Number(randomRating()),
    communicationRating: Number(randomRating()),
    cleanlinessRating: Number(randomRating()),
    locationRating: Number(randomRating()),
    checkinRating: Number(randomRating()),
    valueRating: Number(randomRating()),
    postDate: faker.date.month()
  }
  return seedingObj
}

// const fileLoader = (table, filepath, callback) => {
// 	db.pool.query(`COPY ${table} FROM '${filepath}';`, (err, resp) => {
// 		callback(err, resp)
// 	})
// }

const seeder = function () {
  fs.writeFile(csvFile, "", 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      fs.open(csvFile, 'r+', (err, fd) => {
        if(err) {
          console.log (err)
        } else {
          console.log('Process started at ' + Date())
        }
        const recursion = (n) => {
          if(n>totalEntries) {
            console.log('FileWrite completed at ' + Date())
            return db.fileLoader('reviews', csvFile, (err, data) => {
              if (err) {
                console.error(err)
              } else {
                console.log('Entries loaded into database succesfully at ' + Date())
                return
              }
              })
          }
          var {imagePath, name, postDate, review, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkinRating, valueRating} = entryObject(n);
					var inputString = `${n}\t${imagePath}\t${name}\t${review}\t${accuracyRating}\t${communicationRating}\t${cleanlinessRating}\t${locationRating}\t${checkinRating}\t${valueRating}\t${postDate}\n`
					fs.write(fd, inputString, (err) => {
						if(err) console.error(err)
            recursion(n+1)
          })
        }
        recursion(0)
      })
    }
  })
}

seeder()



