import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReviewList from './ReviewList';
import ReviewStars from './ReviewStars';
import PaginationComponent from './Pagination';
import styled from 'styled-components';
import { EventEmitter } from 'events';
import StarRatings from 'react-star-ratings';
import totalReviewAverage from '../data/totalReviewAverage';

const resultsPerPage = 5; // how many results I’ll display
const pageCount = Math.ceil(20 / resultsPerPage); // quantity of pages
const total = 20; // total number of values
const limit = 5;

//add review stars with a rating star library?

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
    this.handleSearch = this.handleSearch.bind(this);
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

  handleSearch (event) {
    if(event.keyCode == 13) {
      event.preventDefault();
      var query = event.target.value;
      console.log('value', event.target.value);
      console.log(this.state.reviews);
      let reviews = this.state.reviews.filter((comment) => {
        return comment.review.includes(query);
      })
      this.setState({reviews: reviews});
    }
  }

  render () {
    const { currentPage } = this.state; // a state variable that tracks which page the user is on.
    return (
      <BodyContainer>
  
        <TopContainer>
          <ReviewTitle>
          {this.state.reviews.length} Reviews
          {console.log(totalReviewAverage(this.state.reviews))}
          </ReviewTitle>
          <MainReviewStarContainer>
          <StarRatings
              rating={totalReviewAverage(this.state.reviews)}
              starRatedColor='rgb(0, 125, 140)'
              numberOfStars={5}
              name='rating'
              starDimension='22px'
              starSpacing='3px'
              isAggregateRating='true'
            />
          </MainReviewStarContainer>
          {/* <MagnifyingGlass>
          <span className="iconify" data-icon="mdi-light:magnify" data-inline="false"></span>
          </MagnifyingGlass> */}

          <FormContainer>
            <form>
              <Input type="text" name="SearchReviews" placeholder="Search reviews" onKeyDown={this.handleSearch}/>
            </form>
          </FormContainer>
        </TopContainer>

        <ReviewStars reviews={this.state.reviews}/>

        <ReviewList reviews={this.state.reviews} />

        <div className="pagination">
          <PaginationComponent
            total={total}
            resultsPerPage={resultsPerPage}
            pageCount={pageCount}
            currentPage={currentPage}
            handlePageChange={this.handlePageChange}
            />
        </div>
      </BodyContainer>
    )
  };
};

const BodyContainer = styled.div`
  max-width: 40%;
  display: flex;
  margin: 0 235px;
  flex-direction: column;
  padding: 22px;
`

//Top container has the Review Stars and search bar including the magnifying glass image
const TopContainer = styled.div`
  display: flex;
  height: 73px;
  border-bottom: solid;
  border-bottom-color: #E8E8E8;
  border-bottom-width: 0.5px;
  border-top: solid;
  border-top-color: #E8E8E8;
  border-top-width: 0.5px;
`;

const FormContainer = styled.div`
  height: 34px;
  margin: 24px 0;
  margin-left: auto;
`;

const ReviewTitle = styled.div`
  font-family: 'Nunito Sans', sans-serif;
  align-self: flex-start;
  margin: 20px 0;
  font-size: 26px;
  font-weight: 900;
`;

const MagnifyingGlass = styled.div`
`;

const MainReviewStarContainer = styled.div`
  margin: 27px 15px;
  height: 15px;
`;

const Input = styled.input`
  display: flex;
  padding: 8px;
  padding-left: 30px;
  color: #686868;
  font-size: 14px;
  border-style: solid;
  background: white;
  border-color: #E8E8E8;
  border-radius: 3px;
  border-width: 0.5px;
  &:focus {
    border-color: #007D8C;
    outline: none !important;
  }
`;




ReactDOM.render(<App />, document.getElementById('reviews'));