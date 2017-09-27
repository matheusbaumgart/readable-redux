import { combineReducers } from 'redux'
import {
  REQUEST_POSTS, RECEIVE_POSTS,
  REQUEST_CATEGORIES, RECEIVE_CATEGORIES,
  REQUEST_COMMENTS, RECEIVE_COMMENTS
} from '../actions'

// POSTS
const posts = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        items: action.posts,
      }
    default:
      return state
  }
}

// CATEGORIES
const categories = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        isFetching: false,
        items: action.categories,
      }
    default:
      return state
  }
}

// COMMENTS
const comments = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_COMMENTS:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_COMMENTS:
      return {
        ...state,
        isFetching: false,
        items: action.comments,
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
    posts,
    categories,
    comments
})

export default rootReducer
