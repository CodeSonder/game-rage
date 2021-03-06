import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import { withRouter } from 'react-router';
import decode from 'jwt-decode';
import Reviews from './components/Reviews'
import Review from './components/Review'
import ReviewCreate from './components/ReviewCreate'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import {
  createReview,
  readAllReviews,
  updateReview,
  destroyReview,
  loginUser,
  registerUser,
  // readOneReview
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

  // -------------- AUTH ------------------



  handleLoginButton = () => {
    this.props.history.push("/login")
  }
  handleLogin = async () => {
    const userData = await loginUser(this.state.authFormData, this.state.currentUser);

    this.setState({
      currentUser: decode(userData.token)
    })
    
    localStorage.setItem("jwt", userData.token)
    this.props.history.push('/')
  }
  handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(this.state.authFormData);
    this.handleLogin();
    this.props.history.push('/')
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



  //------ CRUD-------------



  getReviews = async () => {

    const reviews = await readAllReviews()



    this.setState({ 
      reviews 
    })


  }



  newReview = async (e) => {
    e.preventDefault()
    const review = await createReview(this.state.reviewForm, 1)

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



  componentDidMount() {
    
    const checkUser = localStorage.getItem("jwt");
     if (checkUser) {
      const user = decode(checkUser);
     
      
      
      
      this.setState({
        currentUser: user,
        
      })
      
     }}
  render() {
     let myRev = this.state.reviews.map(review => {
      return <Link  to={`/reviews/${review.id}`}><h1 className='notes-list'>{review.comment}</h1></Link>
    })
    // console.log(this.state.reviews)
    return (
      <div>
        <header className='header-block'>
          <nav className='nav-link'>
            <h1 className='link'><Link to='/'>Home</Link>
            </h1>
            <h1 className='link'><Link to='/reviews'>Add Note</Link></h1>
            <h1 className='link'><Link to='/reviews/1'>My Note</Link></h1>
            
          </nav>
          <div >
            {this.state.currentUser
              ?
              <>
                <p className='username'>{this.state.currentUser.username}</p>

                <button className='logout-button' onClick={this.handleLogout}>Logout</button>
              </>
              :
              <button className='login-register-button' onClick={this.handleLoginButton}>Login/Register</button>
            }
          </div>
        </header>
        <Switch>
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
            exact path="/reviews"
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
            // /reviews/:id
            path="/reviews/:id"
            render={(props) => {

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
          <Route path='/'>
            <Home />
            {myRev}
          </Route>

          {/* <Route exact path='/allnotes'>

            {myRev}
          </Route> */}

        </Switch>
      </div>
    );
  }
}
export default withRouter(App);