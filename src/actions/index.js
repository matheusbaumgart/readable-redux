export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'

const url = 'http://localhost:3001'
const header = { headers: { 'Authorization': 'udacity-readable' } }

// POSTS
export const requestPosts = () => ({
    type: REQUEST_POSTS,
})

export const receivePosts = data => ({
    type: RECEIVE_POSTS,
    posts: data,
})

export const fetchPosts = category => dispatch => {
    dispatch(requestPosts())
    return fetch(category ? `${url}/${category}/posts/` : `${url}/posts/`, header)
        .then(response => response.json())
        .then(data => { dispatch(receivePosts(data)) })
}

// CATEGORIES
export const requestCategories = () => ({
    type: REQUEST_CATEGORIES,
})

export const receiveCategories = data => ({
    type: RECEIVE_CATEGORIES,
    categories: data,
})

export const fetchCategories = () => dispatch => {
    dispatch(requestCategories())
    return fetch(`${url}/categories/`, header)
        .then(response => response.json())
        .then(data => { dispatch(receiveCategories(data)) })
}

// COMMENTS
export const requestComments = () => ({
    type: REQUEST_COMMENTS,
})

export const receiveComments = data => ({
    type: RECEIVE_COMMENTS,
    comments: data
})

export const fetchComments = postID => {
    return fetch(`${url}/posts/${postID}/comments`, header)
    .then((res) => res.json())
}