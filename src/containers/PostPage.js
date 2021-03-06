import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPost, fetchComments, submitDeletePost, showModal } from '../actions'
import AddEditPostModal from '../components/AddEditPostModal'
import CommentAdd from '../components/comments/CommentAdd'
import CommentsList from '../components/comments/CommentsList'
import { Link } from 'react-router-dom'

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

    openModal = () => {
        const { dispatch, post } = this.props
        dispatch(showModal('EDIT_POST_MODAL', post))
    }

    deletePost = () => {
        const { dispatch, post, history } = this.props
        dispatch(submitDeletePost(post.id))
        history.push('/')
    }

    render() {
        const { post, comments } = this.props
        let hasPost = Object.keys(post).length === 0 && post.constructor === Object;

        return (
            <div>
                {!hasPost ?
                    <div>
                        <AddEditPostModal />

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

                        <Score post={post} />

                        <hr />

                        <CommentAdd postID={post.id} />

                        <hr />

                        <CommentsList comments={comments.items} />
                    </div>
                    :
                    <div>
                        <h2>Post not found.</h2> 
                        <br />Return to <Link to='/'>home</Link>
                    </div>
                }
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
