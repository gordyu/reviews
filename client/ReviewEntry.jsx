import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
var faker = require('faker');

var ReviewEntry = ({review}) => {
    return (
      <div className="reviewContainer">
        <img className="profileImage" src={faker.image.avatar()}  height="42" width="42" />
        <div className="userName">{ review.name }</div>
        <div className="postDate">{ faker.date.month() } { review.postDate }</div>
        <div className="reviewDescription">{ review.review }</div>
      </div>
    )
}

// ReviewEntry.PropTypes = {
//   review: review.PropTypes.object.isRequired
// }

export default ReviewEntry;