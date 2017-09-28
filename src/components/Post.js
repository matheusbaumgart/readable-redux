import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchComments, submitDeletePost, showModal } from '../actions'

import { Icon } from 'react-fa'
import Moment from 'react-moment';
import 'moment-timezone';

class Post extends Component {

    constructor() {
        super();

        this.state = {
            comments: [],
        };
    }

    componentDidMount() {
        const { post } = this.props
        fetchComments(post.id).then(comments => {
            this.setState({
                comments: comments
            })
        })
    }

    openModal = () => {
        const { dispatch, post } = this.props
        dispatch(showModal('EDIT_POST_MODAL', post))
    }

    deletePost = () => {
        const { dispatch, post } = this.props
        dispatch(submitDeletePost(post.id))
    }

    render() {
        const { post } = this.props

        return (
            <tr>
                <td>
                    <div className="vote-score">{post.voteScore}</div>
                    &nbsp;<Icon data-id={post.id} onClick={this.handleVoteDown} className="vote-icon down" name="caret-down" />
                    &nbsp;<Icon data-id={post.id} onClick={this.handleVoteUp} className="vote-icon up" name="caret-up" />
                </td>
                <td>
                    <Link to={{ pathname: post.category + '/' + post.id, }}>
                        {post.title}
                    </Link>
                    <div className="comment-counter-container">
                        <Icon className="post-action-link" name="comment" />
                        <span className="comment-counter">
                            {this.state.comments.length}
                        </span>
                    </div>
                </td>
                <td>
                    {post.category}
                </td>
                <td>
                    <Moment format="YYYY/MM/DD HH:mm">{post.timestamp}</Moment>
                </td>
                <td>
                    <Icon name="pencil" className="post-action-link" onClick={this.openModal} />
                    <Icon name="remove" className="post-action-link" onClick={this.deletePost} />
                </td>
            </tr>
        )
    }
}

function mapStateToProps(state) {
    return (
        {}
    )
}
export default connect(mapStateToProps)(Post)