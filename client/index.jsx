import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReviewList from './ReviewList';
import ReviewStars from './ReviewStars';
import PaginationComponent from './Pagination';
import styled from 'styled-components';

const resultsPerPage = 5; // how many results I’ll display
const pageCount = Math.ceil(20 / resultsPerPage); // quantity of pages
const total = 20; // total number of values
const limit = 5;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentPage: 1,
      reviews: [],
      data: {
        count: 0,
        results: []
      }
    }
  }

  componentDidMount () {
    fetch('http://localhost:3003/reviews')
    .then(response => response.json())
    .then(data => this.setState({reviews: data}));
  }

  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };

  render () {
    const { currentPage } = this.state; // a state variable that tracks which page the user is on.
    return (
      <div className="reviewContainer">
        <div>
          <ReviewStars reviews={this.state.reviews}/>
        </div>
        <div className="reviewList">
        <ReviewList reviews={this.state.reviews} />
        </div>
        <PaginationComponent
          total={total}
          resultsPerPage={resultsPerPage}
          pageCount={pageCount}
          currentPage={currentPage}
          handlePageChange={this.handlePageChange}
        />;
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));