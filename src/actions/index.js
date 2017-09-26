export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

const url = 'http://localhost:3001'
const header = { headers: { 'Authorization': 'udacity-readable' } }

// POSTS
export const requestPosts = category => ({
    type: REQUEST_POSTS,
    category
})

export const receivePosts = (category, json) => ({
    type: RECEIVE_POSTS,
    category,
    posts: json,
})

export const fetchPosts = category => dispatch => {
    dispatch(requestPosts(category))
    debugger;
    return fetch(category ? `${url}/${category}/posts/` : `${url}/posts/`, header)
        .then(response => response.json())
        .then(json => {dispatch(receivePosts(category, json))})
}
