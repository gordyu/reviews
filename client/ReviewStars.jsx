import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';


var ReviewStars = ({reviews}) => {
  
  return (
  <ReviewStarsContainer>

    <LeftContainer>
      <RatingStars> 
        Accuracy
      </RatingStars>
      <RatingStars> 
        Communication 
      </RatingStars>
      <RatingStars> 
        Cleanliness 
      </RatingStars>

      <RatingContainer>
        <StarRatings
          rating={reviews.cleanliness}
          starRatedColor='rgb(0, 125, 140)'
          numberOfStars={5}
          name='rating'
          starDimension='18px'
          starSpacing='3px'
          isAggregateRating='true'
        />
      </RatingContainer>
      <RatingContainer>
        <StarRatings
            rating={reviews.communication}
            starRatedColor='rgb(0, 125, 140)'
            numberOfStars={5}
            name='rating'
            starDimension='18px'
            starSpacing='3px'
            isAggregateRating='true'
          />
      </RatingContainer>
      <RatingContainer>
        <StarRatings
            rating={reviews.accuracy}
            starRatedColor='rgb(0, 125, 140)'
            numberOfStars={5}
            name='rating'
            starDimension='18px'
            starSpacing='3px'
            isAggregateRating='true'
          />
      </RatingContainer>
    </LeftContainer>

    <RightContainer>
      <RatingStars> 
        Location 
      </RatingStars>
      <RatingStars> 
        Check-In 
      </RatingStars>
      <RatingStars> 
        Value 
      </RatingStars>
        <RatingContainer>
          <StarRatings
              rating={reviews.location}
              starRatedColor='rgb(0, 125, 140)'
              numberOfStars={5}
              name='rating'
              starDimension='18px'
              starSpacing='3px'
              isAggregateRating='true'
            />
        </RatingContainer>
        <RatingContainer>
          <StarRatings
              rating={reviews.checkin}
              starRatedColor='rgb(0, 125, 140)'
              numberOfStars={5}
              name='rating'
              starDimension='18px'
              starSpacing='3px'
              isAggregateRating='true'
            />
        </RatingContainer>
        <RatingContainer>
          <StarRatings
              rating={reviews.value}
              starRatedColor='rgb(0, 125, 140)'
              numberOfStars={5}
              name='rating'
              starDimension='18px'
              starSpacing='3px'
              isAggregateRating='true'
            />
        </RatingContainer>
    </RightContainer>

  </ReviewStarsContainer>
  );
};
//parent
const ReviewStarsContainer = styled.div`
  display: flex;
  height: 105px;
  flex-wrap: wrap;
  align-content: space-between;
  flex-direction: column;
`;
//child
const LeftContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 295px;
  height: 105px;
  padding: 0 4px;
  margin-left: 10px;
  flex-direction: column;
`;

const RightContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 295px;
  height: 105px;
  padding: 0 4px;
  flex-direction: column;
`;

const RatingStars = styled.div`
  padding: 5px;
  font-family: 'Nunito Sans', sans-serif;
  color: #404040;
`;
const RatingContainer = styled.div`
  padding: 5px;
`;

// ReviewStars.PropTypes = {
//   reviews: review.PropTypes.object.isRequired
// }

export default ReviewStars;
