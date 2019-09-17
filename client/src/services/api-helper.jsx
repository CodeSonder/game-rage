import axios from 'axios';
const baseUrl = 'https://game-rage.herokuapp.com'


const api = axios.create({
  baseURL: baseUrl
})

export const loginUser = (loginData) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: {
      'Content-Type': 'application/json'
    }

  }
  return fetch(`${baseUrl}/auth/login`, opts)
    .then(resp => resp.json())
}

export const registerUser = (registerData) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify({ user: registerData }),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return fetch(`${baseUrl}/users/`, opts)
    .then(resp => resp.json())
}


const createReview = (data, user_id) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    
  }
  return fetch(`${baseUrl}/users/${user_id}/reviews`, opts)
    .then(resp => resp.json())
}


const readAllReviews = async () => {
  const resp = await api.get(`/users/1/reviews`)
   
  
  return resp.data
}

// const readOneReview = async (user_id, id) => {
//   const resp = await api.get(`/users/${user_id}/reviews/${id}`)

//   return resp.data

// }

const updateReview = (id, data, user_id) => {
  const opts = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return fetch(`${baseUrl}/users/${user_id}/reviews/${id}`, opts)
    .then(resp => resp.json())
}


const destroyReview = (id, user_id) => {
  const opts = {
    method: 'DELETE'
  }
  return fetch(`${baseUrl}/users/${user_id}/reviews/${id}`, opts)
}



export {
  createReview,
  readAllReviews,
  // readOneReview,
  updateReview,
  destroyReview
}