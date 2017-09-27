import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Icon } from 'react-fa'
import Moment from 'react-moment';
import 'moment-timezone';

class Posts extends Component {


    render() {
        const { posts } = this.props

        return (
            <table className="post-list">
                <thead>
                    <tr>
                        <th width="120">Vote</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, i) =>
                        <tr key={i}>
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
                                        {/* {this.state.comments.length} */}
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
                                <Icon name="pencil" className="post-action-link" data-id={post.id} onClick={this.openModal} />
                                <Icon name="remove" className="post-action-link" data-id={post.id} onClick={this.deletePost} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

}

Posts.propTypes = {
    posts: PropTypes.array.isRequired
}

export default Posts
