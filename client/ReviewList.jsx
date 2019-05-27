import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import ReviewEntry from './ReviewEntry';

var ReviewList = ({reviews}) => { 
  return (
    <div className="reviewList"> 
      {
        reviews.map(review => {
        return <ReviewEntry review={ review } key={ review.id }/>
      }) }
    </div>
  );
};

// ReviewList.PropTypes = {
//   reviews: reviews.PropTypes.array.isRequired
// }

export default ReviewList;
