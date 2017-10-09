export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const CHANGE_COMMENT_VOTE = 'CHANGE_COMMENT_VOTE'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'
export const UPDATE_SCORE = 'UPDATE_SCORE'

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

export const receivePost = post => ({
    type: RECEIVE_POST,
    post: post,
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

export const updateScore = post => ({
    type: UPDATE_SCORE,
    post
})

export const fetchPosts = category => dispatch => {
    dispatch(requestPosts())
    return fetch(category ? `${url}/${category}/posts/` : `${url}/posts/`, header)
        .then(res => res.json())
        .then(data => { dispatch(receivePosts(data)) })
}

export const fetchPost = postID => dispatch => {
    return fetch(`${url}/posts/${postID}`, header)
        .then(res => res.json())
        .then(data => { dispatch(receivePost(data)) })
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
        .then(res => dispatch(updateScore(res)))
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
export const requestComments = () => ({
    type: REQUEST_COMMENTS,
})

export const receiveComments = data => ({
    type: RECEIVE_COMMENTS,
    comments: data
})

export const editComment = (id, body, timestamp) => ({
    type: EDIT_COMMENT,
    id,
    body,
    timestamp
})

export const deleteComment = commentID => ({
    type: DELETE_COMMENT,
    commentID
})

export const addComment = comment => ({
    type: ADD_COMMENT,
    comment
})

export const changeCommentVote = comment => ({
    type: CHANGE_COMMENT_VOTE,
    comment
})

export const fetchComments = postID => dispatch => {
    dispatch(requestComments())
    return fetch(`${url}/posts/${postID}/comments`, header)
        .then(res => res.json())
        .then(data => { dispatch(receiveComments(data)) })
}

export const fetchAllComments = postID => {
    return fetch(`${url}/posts/${postID}/comments`, header)
        .then(res => res.json())
}

export const submitEditComment = (commentID, commentBody) => dispatch => {
    return fetch(`${url}/comments/${commentID}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'udacity-readable',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            timestamp: Date.now(),
            body: commentBody
        })
    }).then(res => res.json())
        .then(data => { dispatch(editComment(commentID, commentBody, Date.now())) })
}

export const submitDeleteComment = commentID => dispatch => {
    return fetch(`${url}/comments/${commentID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'udacity-readable',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => { dispatch(deleteComment(commentID)) })
}

export const submitAddComment = comment => dispatch => {
    return fetch(`${url}/comments`, {
        method: 'POST',
        headers: {
            'Authorization': 'udacity-readable',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: comment.id,
            timestamp: comment.timestamp,
            body: comment.body,
            author: comment.author,
            parentId: comment.parentId
        })
    }).then(res => res.json())
        .then(() => dispatch(addComment(comment)))
}

export const submitVoteComment = (commentID, option) => dispatch => {
    return fetch(`${url}/comments/${commentID}`, {
        method: 'POST',
        headers: {
            'Authorization': 'udacity-readable',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option: option
        })
    }).then(res => res.json())
        .then(res => dispatch(changeCommentVote(res)))
}


// ADD AND EDIT MODAL
export function showModal(modalType, data) {
    return {
        type: SHOW_MODAL,
        modalType: modalType,
        modalProps: {
            modalIsOpen: true,
        },
        modalData: data
    }
}

export function hideModal(modal) {
    return {
        type: HIDE_MODAL,
        modal
    }
}