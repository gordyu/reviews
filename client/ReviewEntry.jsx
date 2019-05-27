import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
var faker = require('faker');
import styled from 'styled-components';


var ReviewEntry = ({review}) => {
    return (
      <Wrapper>
        <img className="profileImage" src={faker.image.avatar()}  height="42" width="42" />
        <UserName> { review.name } </UserName>
        <PostDate> { faker.date.month() } { review.postDate } </PostDate>
        <Review> { review.review } </Review>
      </Wrapper>
    )
}

const Wrapper = styled.div`
  border-bottom: 1px;
  border-bottom-color: #E8E8E8;
`;

const Review = styled.h4`
  font-family: 'Nunito Sans', sans-serif;
`;

const UserName = styled.h4`
  font-family: 'Nunito Sans', sans-serif;
  font-weight: bold;
`;

const PostDate = styled.h5`
  font-family: 'Nunito Sans', sans-serif;
`;

// ReviewEntry.PropTypes = {
//   review: review.PropTypes.object.isRequired
// }

export default ReviewEntry;