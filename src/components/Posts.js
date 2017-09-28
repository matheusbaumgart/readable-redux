import React, { Component } from 'react';
import PropTypes from 'prop-types'

import Post from './Post'
import AddEditPostModal from './AddEditPostModal'

class Posts extends Component {

    render() {
        const { posts } = this.props

        return (
            <div>
                <AddEditPostModal />

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
                        {posts.length > 0 ? posts.map((post, i) => post.deleted == false ? <Post key={i} post={post} /> : null
                        ) :
                            <tr>
                                <td colSpan={5}>There is no post for this category</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    }

}

Posts.propTypes = {
    posts: PropTypes.array.isRequired
}

export default Posts
