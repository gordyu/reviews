import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

var ReviewStars = ({reviews}) => {
  return (
    <ReviewStarsContainer>
      <RatingStars> Accuracy </RatingStars>
      <RatingStars> Communication </RatingStars>
      <RatingStars> Cleanliness </RatingStars>
      <RatingStars> Location </RatingStars>
      <RatingStars> Check-In </RatingStars>
      <RatingStars> Value </RatingStars>
      <br />
    </ReviewStarsContainer>
  );
};
//parent
const ReviewStarsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 105px;
  align-content: center;
  justify-content: space-between;
  flex-direction: column;
`;
//child
const RatingStars = styled.div`
  padding: 5px;
  font-family: 'Nunito Sans', sans-serif;
`;

// ReviewStars.PropTypes = {
//   reviews: review.PropTypes.object.isRequired
// }

export default ReviewStars;
