import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { showModal } from '../actions'
import AddEditPostModal from './AddEditPostModal'
import Post from './Post'

class Posts extends Component {
    openModal = () => {
        const { dispatch } = this.props
        dispatch(showModal('ADD_POST_MODAL'))
    }

    render() {
        const { posts } = this.props

        return (
            <div>
                <button onClick={this.openModal}>Add a new post</button>

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

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps)(Posts)
