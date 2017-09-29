import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPost } from '../actions'

import { Icon } from 'react-fa'
import Moment from 'react-moment';
import 'moment-timezone';

import Score from '../components/Score'

class PostPage extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        const postID = this.props.match.params.post_id;
        dispatch(fetchPost(postID))
    }

    updatePost = () => {
        const { dispatch } = this.props
        const postID = this.props.match.params.post_id;
        dispatch(fetchPost(postID))
    }

    render() {
        const { post } = this.props

        return (
            <div>
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

                <h4>Comments</h4>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { post } = state

    return {
        post
    }
}

export default connect(mapStateToProps)(PostPage)
