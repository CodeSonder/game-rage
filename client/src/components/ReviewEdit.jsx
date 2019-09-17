import React from 'react';
import { withRouter } from 'react-router-dom';

function ReviewEdit(props) {
  return (
    <div>
      <h3>Edit Note</h3>
      <form onSubmit={props.handleSubmit}>

        <p>Comment:</p>

        <input
          type="text"
          name="comment"
          value={props.reviewForm.name}
          onChange={props.handleFormChange} />

        
        
        <br/>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default withRouter(ReviewEdit);
