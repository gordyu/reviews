import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
var faker = require('faker');
import styled from 'styled-components';


class ReviewEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    display: 'flex',
    }
  }
  toggleClassDelete () {
    this.setState({
      display: 'none',
    })
  }

  render () {

    return (
      <Wrapper style={{display: this.state.display}}>
        <EditDeleteWrapper>

          <DeleteReviewButtonContainer>
            <button className='edit-button' style={{
              borderColor: 'black',
              cursor: 'pointer',
              backgroundColor: 'grey',
              color: 'white',
              padding: '5px',
              borderRadius: '6px',
              fontSize: '12px',
              borderWidth: '1px',
              float: 'right',
            }}
            onClick={()=>{this.props.delete(this.props.review._id)},this.toggleClassDelete.bind(this)}
            > Delete
            </button>
          </DeleteReviewButtonContainer>
          {/* <EditReviewButtonContainer>
            <button className='edit-button' style={{
              borderColor: 'black',
              cursor: 'pointer',
              backgroundColor: 'grey',
              color: 'white',
              padding: '5px',
              borderRadius: '6px',
              fontSize: '12px',
              borderWidth: '1px',
              marginRight: '20px',
              float: 'right',
            }} >Edit</button>
          </EditReviewButtonContainer> */}
        </EditDeleteWrapper>
        <TopContainer>
          <ImageContainer>
            <Image className="profileImage" src={faker.image.avatar()}  height="42" width="42" />
          </ImageContainer>
          <NameAndDateContainer>
            <UserNameContainer> { this.props.review.name } </UserNameContainer>
            <PostDate>
            { faker.date.month() } { this.props.review.postDate }
            </PostDate>
          </NameAndDateContainer>
        </TopContainer>
        <Review>
          { this.props.review.review }
        </Review>
      </Wrapper>
    )
  }
}

const EditDeleteWrapper = styled.div`
`

const EditReviewButtonContainer = styled.div`
`
const DeleteReviewButtonContainer = styled.div`
`

const Wrapper = styled.div`
  border-bottom: solid;
  border-bottom-color: #E8E8E8;
  border-bottom-width: 0.5px;
  flex-direction: column;
  padding: 22px 0;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-around;
  padding: 10px 0;
`;

const Image = styled.img`
  border-radius: 50%;
`;

const ImageContainer = styled.div`
  margin-right: 15px;
`;

const NameAndDateContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Review = styled.div`
  font-family: 'Nunito Sans', sans-serif;
  color: #404040;
`;

const UserNameContainer = styled.div`
font-family: 'MontrealRegular';
  font-weight: normal;
  font-style: normal;
  color: #404040;
  font-size: 16px;
`;

// const UserName = styled.h4`
//   font-family: 'Nunito Sans', sans-serif;
//   font-weight: bold;
// `;

const PostDate = styled.div`
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  color: #404040;
`;

// ReviewEntry.PropTypes = {
//   review: review.PropTypes.object.isRequired
// }

export default ReviewEntry;