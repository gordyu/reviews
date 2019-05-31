
var totalReviewAverage = function (reviewsList) {
  if (reviewsList === [] || reviewsList.length < 1 || reviewsList === undefined) {
    return 0;
  }
  var total = 0;

  var totalReviewAverage = {
    accuracy: 0,
    communication: 0,
    cleanliness: 0,
    location: 0,
    checkin: 0,
    value: 0
  };

  reviewsList.map(review => {
    totalReviewAverage.accuracy += review.accuracyRating;
    totalReviewAverage.communication += review.communicationRating;
    totalReviewAverage.cleanliness += review.cleanlinessRating;
    totalReviewAverage.location += review.locationRating;
    totalReviewAverage.checkin += review.checkinRating;
    totalReviewAverage.value += review.valueRating;
  });
  for (var key in totalReviewAverage) {
    totalReviewAverage[key] = (totalReviewAverage[key] / reviewsList.length).toFixed(3);
    totalReviewAverage[key] = Number(totalReviewAverage[key]);
  }
  for (var key in totalReviewAverage) {
    total += totalReviewAverage[key];
  }
  total = total / 6;
  return total;
}

  export default totalReviewAverage;