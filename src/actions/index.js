export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'

const uuidv1 = require('uuid/v1');
const url = 'http://localhost:3001'
const header = { headers: { 'Authorization': 'udacity-readable' } }

// POSTS
export const requestPosts = () => ({
    type: REQUEST_POSTS,
})

export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts: posts,
})

export const addPost = post => ({
    type: ADD_POST,
    post
})

export const editPost = post => ({
    type: EDIT_POST,
    post
})

export const deletePost = postID => ({
    type: DELETE_POST,
    postID
})

export const fetchPosts = category => dispatch => {
    dispatch(requestPosts())
    return fetch(category ? `${url}/${category}/posts/` : `${url}/posts/`, header)
        .then(res => res.json())
        .then(data => { dispatch(receivePosts(data)) })
}

export const submitPost = post => dispatch => {
    return fetch(`${url}/posts`, {
        method: 'POST',
        headers: {
            'Authorization': 'udacity-readable',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author: post.author,
            body: post.body,
            title: post.title,
            category: post.category,
            timestamp: Date.now(),
            id: uuidv1()
        })
    }).then(res => res.json())
        .then(data => { dispatch(addPost(data)) })
}

export const submitUpdatePost = post => dispatch => {
    return fetch(`${url}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'udacity-readable',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: post.title,
            body: post.body
        })
    }).then(res => res.json())
        .then(data => { dispatch(editPost(data)) })
}

export const submitDeletePost = postID => dispatch => {
    return fetch(`${url}/posts/${postID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'udacity-readable',
            'Content-Type': 'application/json'
        }
    }).then(() => { dispatch(deletePost(postID)) })
}

export const submitVote = (postID, option) => dispatch => {
    return fetch(`${url}/posts/${postID}`, {
        method: 'POST',
        headers: {
            'Authorization': 'udacity-readable',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option: option
        })
    }).then(res => res.json())
        .then(() => dispatch(fetchPosts()))
}

// CATEGORIES
export const requestCategories = () => ({
    type: REQUEST_CATEGORIES,
})

export const receiveCategories = data => ({
    type: RECEIVE_CATEGORIES,
    categories: data.categories,
})

export const fetchCategories = () => dispatch => {
    dispatch(requestCategories())
    return fetch(`${url}/categories/`, header)
        .then(res => res.json())
        .then(data => { dispatch(receiveCategories(data)) })
}

// COMMENTS
// export const requestComments = () => ({
//     type: REQUEST_COMMENTS,
// })

// export const receiveComments = data => ({
//     type: RECEIVE_COMMENTS,
//     comments: data
// })

export const fetchComments = postID => {
    return fetch(`${url}/posts/${postID}/comments`, header)
        .then((res) => res.json())
}


// ADD AND EDIT MODAL
export function showModal(modalType, data) {
    return {
        type: SHOW_MODAL,
        modalType: modalType,
        modalProps: {
            modalIsOpen: true,
            data: data
        }
    }
}

export function hideModal(modal) {
    return {
        type: HIDE_MODAL,
        modal
    }
}