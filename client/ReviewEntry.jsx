import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

var ReviewEntry = ({review}) => {
    return (
      <div className="reviewContainer">
        <div className="profileImage">{ review.imagePath }</div>
        <div className="userName">{ review.name }</div>
        <div className="postDate">{ review.postDate }</div>
        <div className="reviewDescription">{ review.review }</div>
      </div>
    )
}

// ReviewEntry.PropTypes = {
//   review: review.PropTypes.object.isRequired
// }

export default ReviewEntry;