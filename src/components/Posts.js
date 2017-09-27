import React, { Component } from 'react';
import PropTypes from 'prop-types'

import Post from './Post'

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
                        <Post key={i} post={post} />
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
