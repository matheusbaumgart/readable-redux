export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

const url = 'http://localhost:3001'
const header = { headers: { 'Authorization': 'udacity-readable' } }

// POSTS
export const requestPosts = category => ({
    type: REQUEST_POSTS,
    category
})

export const receivePosts = (category, data) => ({
    type: RECEIVE_POSTS,
    category,
    posts: data,
})

export const fetchPosts = category => dispatch => {
    dispatch(requestPosts(category))
    return fetch(category ? `${url}/${category}/posts/` : `${url}/posts/`, header)
        .then(response => response.json())
        .then(data => { dispatch(receivePosts(category, data)) })
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
