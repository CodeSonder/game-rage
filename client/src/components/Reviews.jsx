import React from 'react';
import { withRouter } from 'react-router';

function Reviews(props) {
  return (
    <div className="review-container">
      {/* {props.reviews.map(review => (
        <div
          key={review.id}
          className="review-card"
          onClick={() => {
            props.history.push(`/reviews/${review.id}`)
            window.scrollTo(0, 0);
          }}>
         
        </div> */}
      {/* ))} */}
      <div
        className="review-card" 
        >
        <img onClick={() => props.history.push('/new/review')} width='75px'
        height='75px'
          alt="Create a new review"
          src="https://image.flaticon.com/icons/png/512/14/14980.png"
          className="plus-sign" />
        <h3>Create a new note</h3>
      </div>
    </div>
  )
}

export default withRouter(Reviews)