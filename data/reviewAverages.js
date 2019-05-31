
var reviewAverages = function (reviewsList) {
  if (reviewsList === [] || reviewsList.length < 1 || reviewsList === undefined) {
    return 0;
  }
  var reviewAverages = {
    accuracy: 0,
    communication: 0,
    cleanliness: 0,
    location: 0,
    checkin: 0,
    value: 0
  };

  reviewsList.map(review => {
    reviewAverages.accuracy += review.accuracyRating;
    reviewAverages.communication += review.communicationRating;
    reviewAverages.cleanliness += review.cleanlinessRating;
    reviewAverages.location += review.locationRating;
    reviewAverages.checkin += review.checkinRating;
    reviewAverages.value += review.valueRating;
  });
  for (var key in reviewAverages) {
    reviewAverages[key] = (reviewAverages[key] / reviewsList.length).toFixed(3);
    reviewAverages[key] = Number(reviewAverages[key]);
  }
  return reviewAverages;
}

  export default reviewAverages;