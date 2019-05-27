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
      <BodyContainer>
  
        <TopContainer>
          <ReviewTitle>
          {this.state.reviews.length} Reviews
          </ReviewTitle>
          <MagnifyingGlass>
          <span className="iconify" data-icon="mdi-light:magnify" data-inline="false"></span>
          </MagnifyingGlass>

          <FormContainer>
            <form>
              <Input type="text" name="SearchReviews" placeholder="Search reviews"/>
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
  max-width: 100%;
  display: flex;
  margin: 0 250px;
  flex-direction: column;
`

//Top container has the Review Stars and search bar including the magnifying glass image
const TopContainer = styled.div`
  display: flex;
  height: 73px;
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




ReactDOM.render(<App />, document.getElementById('app'));