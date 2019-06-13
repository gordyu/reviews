
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
    reviewAverages.accuracy += Number(review.accuracyrating);
    reviewAverages.communication += Number(review.communicationrating);
    reviewAverages.cleanliness += Number(review.cleanlinessrating);
    reviewAverages.location += Number(review.locationrating);
    reviewAverages.checkin += Number(review.checkinrating);
    reviewAverages.value += Number(review.valuerating);
  });
  for (var key in reviewAverages) {
    reviewAverages[key] = (reviewAverages[key] / reviewsList.length).toFixed(3);
    reviewAverages[key] = Number(reviewAverages[key]);
  }
  return reviewAverages;
}

  export default reviewAverages;