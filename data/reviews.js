var db = require('../database/index');
const mongoose = require('mongoose');

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
const opening = ['A beautiful and spectacular location with', 'Perfect sunny villa in spain with', 'Abysmal looking inside and out but', 'A dreadful experience through and through with', 'Disgusting and dreadful appliances with', 'Wonderful and went above and beyond my expectations including a', 'Fantastic and would highly recommend staying here', 'Great and interesting location with plenty of things nearby to explore', 'Our stay was great and', 'Modern and contemporary furnishings with a', 'Comfortable and spacious rooms and', 'Spectacular patio view and friendly host and'];
const nouns = ['kitchen', 'bedroom', 'garage', 'bathtub', 'living-room space', 'infinity pool', 'hot-tub', 'home-theatre', 'backyard', 'toilet', 'gazebo', 'closet', 'shower', 'garbage can', 'garbage disposal'];
const objects = ['well-lit', 'inviting', 'and majestic', 'interesting looking', 'quiet', 'memorable', 'indescribable', 'picture perfect', 'and best ever', 'and down right terrible'];
const verbs = ['clown themed', 'spaghetti themed', 'brightly colored', 'charming', 'cozy', 'clean', 'well organized','extremely luxurious', 'peaceful', 'rustic', 'delightful', 'horribly smelly', 'wonderfully comfortable', 'with a retreat nearby', 'shopping nearby', 'nightclubs nearby', 'magical creatures nearby'];

let randomReview = function(){
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns)].join(' ');
};
let randomName = function(){
  return randomElement(names);
}

let storageArr = [];
//create array of messages data
  for (let i = 0; i < 20; i++) {
    storageArr.push(new db.Review({
      id: i,
      imagePath: 'placeholder',
      name: randomName(),
      postDate: 2019,
      review: randomReview()
    }));
};

//deletes all reviews from the database and re-inserts new ones
db.Review.deleteMany({}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('database cleared');
    db.Review.insertMany(storageArr, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('database seeded!') 
        db.Review.find({}, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            //console.log(result);
          }
        });
      }
    });
  }
});

