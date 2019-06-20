import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReviewList from './ReviewList';
import ReviewStars from './ReviewStars';
import styled from 'styled-components';
import { EventEmitter } from 'events';
import StarRatings from 'react-star-ratings';
import totalReviewAverage from '../data/totalReviewAverage';
import reviewAverages from '../data/reviewAverages';


const resultsPerPage = 5; // how many results I’ll display
const pageCount = Math.ceil(26 / resultsPerPage); // quantity of pages
const total = 26; // total number of values

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      data: [],
      offset: 0,
      querySubmitted: false,
      query: '',
      reviewsTotal: [],
      addReview: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);

  };

  componentDidMount () {
    fetch('http://localhost:3003/reviews')
    .then(response => response.json())
    .then(data => this.setState({reviews: data, reviewsTotal: data, data: data}));
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
      let reviews = this.state.reviews.filter((comment) => {
        console.log(comment)
        return comment.review.includes(query);
      })
      this.setState({reviews: reviews, querySubmitted: true, query: query});
    }
  };


   handleDelete(id) {
     fetch('http://localhost:3003/reviews/:id', {
       method: 'DELETE',
       body: JSON.stringify({_id: id})
     })
  }

  handlePut(id, text) {
    fetch('http://localhost:3003/reviews/:id', {
      method: 'PUT',
      body: JSON.stringify({_id:id, review: text})
    })
  }

  handleClick() {
    this.setState({reviews: this.state.reviewsTotal, querySubmitted: false})
  }

  render () {

    return (
      <BodyContainer>
        <TopContainer>
          <ReviewTitle>
          {this.state.reviewsTotal.length} Reviews
          </ReviewTitle>
          <MainReviewStarContainer>

          <StarRatings

              rating={totalReviewAverage(this.state.reviewsTotal)}
              starRatedColor='rgb(0, 125, 140)'
              numberOfStars={5}
              name='rating'
              starDimension='22px'
              starSpacing='3px'
              isAggregateRating='true'
            />
          </MainReviewStarContainer>
          <FormContainer>
            <form>
              <Input type="text" name="SearchReviews" placeholder="Search reviews" onKeyDown={this.handleSearch}/>
            </form>
          </FormContainer>
        </TopContainer>
        <ReviewStars reviews={reviewAverages(this.state.reviewsTotal)}/>
        <div>
        { this.state.querySubmitted ?
          <ReviewSearchContainer>
            <ReviewSearchReturn>
            {this.state.reviews.length} guests have mentioned
            </ReviewSearchReturn>

            <SearchWord>
              "{this.state.query}"
            </SearchWord>
            <Link onClick={this.handleClick} style={{cursor: 'pointer'}}>Back to all reviews</Link>
          </ReviewSearchContainer> : null
        }
        </div>
        {/* <AddReviewContainer>
            <button className='add-button' style={{
              borderColor: 'black',
              cursor: 'pointer',
              backgroundColor: '#0099f8',
              color: 'white',
              padding: '10px',
              borderRadius: '6px',
              fontSize: '16px',
              borderWidth: '2px',
            }} >Add Review</button>
          </AddReviewContainer> */}
        <ReviewList reviews={this.state.reviews} delete={this.handleDelete.bind(this)} put={this.handlePut.bind(this)} />

      </BodyContainer>
    )
  };
};

// const AddReview = styled.div`
//   background-color: red;
// `

// const AddReviewContainer = styled.div`
//   margin-left: auto;
// `;


const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  max-width: 591px;
  margin-right: 40px;
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
  font-family: 'MontrealRegular';
  font-weight: bold;
  font-style: normal;
  color: #404040;
  align-self: flex-start;
  margin: 20px 0;
  font-size: 24px;
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

const ReviewSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 4px 0;
  border-bottom: solid;
  border-top: solid;
  border-top-color: #E8E8E8;
  border-top-width: 0.5px;
  border-bottom-color: #E8E8E8;
  border-bottom-width: 0.5px;
`;

const ReviewSearchReturn = styled.div`
  margin: 14px 5px;
  font-family: 'Nunito Sans', sans-serif;
  color: #404040;
  font-size: 14px;
`;

const SearchWord = styled.p`
  color: #404040;
  font-size: 14px;
  font-family: 'MontrealRegular';
  font-weight: bold;
  font-style: normal;
  margin-right: 224px;
`

const Link = styled.a`
  margin: 14px 5px;
  font-family: 'Nunito Sans', sans-serif;
  color: #007D8C;
  font-size: 14px;
  align-self: flex-end;
  text-decoration: none;
  &:hover {
    border-color: #007D8C;
    border-bottom: solid;
    border-bottom-width: 0.5px;
  }
`;

const PaginationContainer = styled.div`
  margin: 13px 0;
  padding: 10px 0;
`;

ReactDOM.render(<App perPage={8}/>, document.getElementById('cis-app'));