import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

var ReviewStars = ({reviews}) => {
  return (
    <div className="reviewStars">
      <ReviewTitle>
      {reviews.length} Reviews
      </ReviewTitle>
      <br />
      <form>
        <input type="text" name="SearchReviews" placeholder="Search reviews" />
      </form>
      <br />
      <Review> Accuracy </Review>
      <Review> Communication </Review>
      <Review> Cleanliness </Review>
      <Review> Location </Review>
      <Review> Value </Review>
      <br />
    </div>
  );
};

const Review = styled.h4`
  font-family: 'Nunito Sans', sans-serif;
`;

const ReviewTitle = styled.h2`
  font-family: 'Nunito Sans', sans-serif;
  font-weight: bold;
`;
// ReviewStars.PropTypes = {
//   reviews: review.PropTypes.object.isRequired
// }

export default ReviewStars;
