import React from 'react';
import ReactDOM from 'react-dom';
//add to other component files 
import $ from 'jquery';
import ReviewList from './ReviewList';
import ReviewStars from './ReviewStars';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      reviews: []
    }
  }

  componentDidMount () {
    fetch('http://localhost:3003/reviews')
    .then(response => response.json())
    .then(data => this.setState({reviews: data}));
  }

  render () {
    return (
      <div className="reviewContainer">
        <h1>review service module!</h1>
        {console.log(this.getReviews)}
        <ReviewList reviews={this.state.reviews} />
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));