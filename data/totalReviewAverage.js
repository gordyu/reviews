
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
    totalReviewAverage.accuracy += Number(review.accuracyrating);
    totalReviewAverage.communication += Number(review.communicationrating);
    totalReviewAverage.cleanliness += Number(review.cleanlinessrating);
    totalReviewAverage.location += Number(review.locationrating);
    totalReviewAverage.checkin += Number(review.checkinrating);
    totalReviewAverage.value += Number(review.valuerating);
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