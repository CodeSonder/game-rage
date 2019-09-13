import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router';
import decode from 'jwt-decode';
import Reviews from './components/Reviews'
import Review from './components/Review'
import ReviewCreate from './components/ReviewCreate'
import Login from './components/Login'
import Register from './components/Register'
import {
  createReview,
  readAllReviews,
  updateReview,
  destroyReview,
  loginUser,
  registerUser
} from './services/api-helper'
import './App.css';
class App extends Component {
  state = {
    reviews: [],
    reviewForm: {
      comment: ""
    },
    currentUser: null,
    authFormData: {
      username: "",
      email: "",
      password: ""
    }
  }
  getReviews = async () => {
    const reviews = await readAllReviews()
    
    
    this.setState({
      reviews
      
    })

     
    
  }
  newReview = async (e) => {
    e.preventDefault()
    const review = await createReview(this.state.reviewForm, this.state.currentUser.id )
    this.setState(prevState => ({
      reviews: [...prevState.reviews, review],
      reviewForm: {
        comment: ""
      }
    }))
  }
  editReview = async () => {
    const { reviewForm } = this.state
    await updateReview(reviewForm.id, reviewForm)
    this.setState(prevState => ({
      reviews: prevState.reviews.map(review => review.id === reviewForm.id ? reviewForm : review)
    }))
  }
  deleteReview = async (id) => {
    await destroyReview(id)
    this.setState(prevState => ({
      reviews: prevState.reviews.filter(review => review.id !== id)
    }))
  }
  handleFormChange = (e) => {
    const { name, value } = e.target
    this.setState(prevState => ({
      reviewForm: {
        ...prevState.reviewForm,
        [name]: value
      }
    }))
  }
  mountEditForm = async (id) => {
    const reviews = await readAllReviews()
    const review = reviews.find(el => el.id === parseInt(id))
    this.setState({
      reviews,
      reviewForm: review
    })
  }

  // -------------- AUTH ------------------
  handleLoginButton = () => {
    this.props.history.push("/login")
  }
  handleLogin = async () => {
    const userData = await loginUser(this.state.authFormData);
    this.setState({
      currentUser: decode(userData.token)
    })
    localStorage.setItem("jwt", userData.token)
    
  }
  handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(this.state.authFormData);
    this.handleLogin();
  }
  handleLogout = async () => {
    localStorage.removeItem("jwt");
    this.setState({
      currentUser: null
    })
  }
  authHandleChange = async (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  }
  componentDidMount() {
    this.getReviews()
    const checkUser = localStorage.getItem("jwt");
    if (checkUser) {
      const user = decode(checkUser);
      this.setState({
        currentUser: user
      })
    }
  }
  render() {
    return (
      <div>
        <header>
          <h1><Link to='/' onClick={() => this.setState({
            reviewForm: {
              comment: ""
            }
          })}>Home</Link></h1>
          <div>
            {this.state.currentUser
              ?
              <>
                <p>{this.state.currentUser.username}</p>
                <button onClick={this.handleLogout}>Logout</button>
              </>
              :
              <button onClick={this.handleLoginButton}>Login / Register</button>
            }
          </div>
        </header>
        <Route exact path="/login" render={() => (
          <Login
            handleLogin={this.handleLogin}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route exact path="/register" render={() => (
          <Register
            handleRegister={this.handleRegister}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route
          exact path="/"
          render={() => (
            <Reviews
              reviews={this.state.reviews}
              reviewForm={this.state.reviewForm}
              handleFormChange={this.handleFormChange}
              newReview={this.newReview} />
          )}
        />
        <Route
          path="/new/review"
          render={() => (
            <ReviewCreate
              handleFormChange={this.handleFormChange}
              reviewForm={this.state.reviewForm}
              newReview={this.newReview} />
          )} />
        <Route
        // /users/:user_id/reviews/:id
          path="/users/:user_id/reviews/:id"
          render={(props) => {
            // const {user_id} = props.match.params
            const { id } = props.match.params;
            const review = this.state.reviews.find(el => el.id === parseInt(id));
            return <Review
              id={id}
              review={review}
              handleFormChange={this.handleFormChange}
              mountEditForm={this.mountEditForm}
              editReview={this.editReview}
              reviewForm={this.state.reviewForm}
              deleteReview={this.deleteReview} />
          }}
        />
      </div>
    );
  }
}
export default withRouter(App);