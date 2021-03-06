import React, { Component } from 'react';
import ReviewEdit from './ReviewEdit'
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    }
  }

  componentDidMount() {
    this.props.mountEditForm(this.props.id);
  }

  render() {
    const { review } = this.props;
    return (
      <div className="note-page">
        {review === undefined ? <h2>Loading . . .</h2> : (
          <div>
            
            
            <p className='comment'>{review.comment}</p>
            
            <hr/>
            {this.state.isEdit ?
              <Route path={`/reviews/:id/edit`} render={() => (
                <ReviewEdit
                  handleFormChange={this.props.handleFormChange}
                  handleSubmit={(e) => {
                    e.preventDefault();
                    this.props.editReview();
                    this.setState({ isEdit: false })
                    this.props.history.push(`/reviews/${this.props.reviewForm.id}`)
                  }}
                  reviewForm={this.props.reviewForm} />
              )} />
              :
              <>
                <button onClick={() => {
                  this.setState({
                    isEdit: true
                  })
                  this.props.history.push(`/reviews/${review.id}/edit`)
                }}>Edit</button>
                <button onClick={() => {
                  this.props.deleteReview(review.id);
                  this.props.history.push('/')
                }}>Delete</button>
              </>
            }
          </div>)}
      </div>)
  }
}

export default withRouter(Review);