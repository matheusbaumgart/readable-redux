import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPost, fetchComments, submitDeletePost, showModal } from '../actions'
import AddEditPostModal from '../components/AddEditPostModal'
import CommentAdd from '../components/comments/CommentAdd'
import CommentsList from '../components/comments/CommentsList'

import { Icon } from 'react-fa'
import Moment from 'react-moment';
import 'moment-timezone';

import Score from '../components/Score'

class PostPage extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        const postID = this.props.match.params.post_id;
        dispatch(fetchPost(postID))
        dispatch(fetchComments(postID))
    }

    updatePost = () => {
        const { dispatch } = this.props
        const postID = this.props.match.params.post_id;
        dispatch(fetchPost(postID))
    }

    openModal = () => {
        const { dispatch, post } = this.props
        dispatch(showModal('EDIT_POST_MODAL', post))
    }

    deletePost = () => {
        const { dispatch, post, history } = this.props
        dispatch(submitDeletePost(post.id))
        history.push('/')
    }

    // editComment = (commentID, commentBody) => {
    //     const { dispatch } = this.props
    //     dispatch(submitEditComment(commentID, commentBody))
    // }

    // deleteComment = (commentID) => {
    //     const { dispatch } = this.props
    //     dispatch(submitDeleteComment(commentID))
    // }

    render() {
        const { post, comments } = this.props

        return (
            <div>
                <AddEditPostModal update={this.updatePost} />

                <div className="flex space-between">
                    <div>
                        <h2 className="no-margin-bottom">{post.title}</h2>
                        <small>by {post.author} - <Moment fromNow>{post.timestamp}</Moment></small>
                    </div>

                    <div>
                        <Icon name="pencil" className="post-action-link" onClick={this.openModal} />
                        <Icon name="remove" className="post-action-link" onClick={this.deletePost} />
                    </div>
                </div>

                <br />

                <p>{post.body}</p>

                <br />

                <Score post={post} update={this.updatePost} />

                <hr />

                <CommentAdd />

                <hr />  

                <CommentsList comments={comments.items} />          
               
            </div>
        )
    }
}

const mapStateToProps = ({ post, comments }) => {
    return {
        post,
        comments
    }
}

export default connect(mapStateToProps)(PostPage)
