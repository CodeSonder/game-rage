import React from 'react';
import { withRouter } from 'react-router-dom';

function ReviewCreate(props) {
  return (
    <div className="create-form" >
      <h2>Create A New Note</h2>
      <form onSubmit={props.newReview}>

        <p>Comment:</p>

        <input
          type="text"
          name="comment"
          value={props.reviewForm.name}
          onChange={props.handleFormChange} />

        <br />
        <button>Submit</button>
      </form>
    </div >
  )
}

export default withRouter(ReviewCreate);