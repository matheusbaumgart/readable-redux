import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {
  REQUEST_POSTS, RECEIVE_POSTS, ADD_POST, DELETE_POST, EDIT_POST, RECEIVE_POST,
  REQUEST_CATEGORIES, RECEIVE_CATEGORIES,
  REQUEST_COMMENTS, RECEIVE_COMMENTS, EDIT_COMMENT, DELETE_COMMENT, ADD_COMMENT, CHANGE_COMMENT_VOTE,
  SHOW_MODAL, HIDE_MODAL,
  UPDATE_SCORE
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
    case ADD_POST:
      return {
        ...state,
        items: [...state.items, action.post]
      }
    case EDIT_POST:
      return {
        ...state,
        items: state.items.map((item, index) => {
          if (item.id !== action.post.id) {
            return item;
          }
          return action.post;
        })
      }
    case DELETE_POST:
      return {
        ...state,
        items: state.items.filter(post => post.id !== action.postID)
      }
    case UPDATE_SCORE:
      return state
    default:
      return state
  }
}

// POST
const post = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POST:
      return action.post
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
    case EDIT_COMMENT:
      return {
        ...state,
        items: state.items.map((item, index) => {
          if (item.id !== action.id) {
            return item;
          }
          return {
            ...item,
            timestamp: action.timestamp,
            body: action.body
          }
        })
      }
    case CHANGE_COMMENT_VOTE:
      return {
        ...state,
        items: state.items.map((item, index) => {
          if (item.id !== action.comment.id) {
            return item;
          }
          return {
            ...item,
            voteScore: action.comment.voteScore
          }
        })
      }
    case DELETE_COMMENT:
      return {
        ...state,
        items: state.items.filter(comment => comment.id !== action.commentID)
      }
    case ADD_COMMENT:
      return {
        ...state,
        items: [...state.items, action.comment]
      }
    default:
      return state
  }
}

//  MODAL
const modalInitialState = {
  modalType: null,
  modalProps: {
    modalIsOpen: false
  }
}

const modal = (state = modalInitialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps
      }
    case HIDE_MODAL:
      return modalInitialState
    default:
      return state
  }
}

const rootReducer = combineReducers({
  posts,
  post,
  categories,
  comments,
  modal,
  form: formReducer
})

export default rootReducer
