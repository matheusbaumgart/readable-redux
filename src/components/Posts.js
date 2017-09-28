import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { showModal } from '../actions'
import AddEditPostModal from './AddEditPostModal'
import Post from './Post'

class Posts extends Component {
    constructor(){
        super();

        this.state = {
            orderBy: 'score'
        }
    }

    openModal = () => {
        const { dispatch } = this.props
        dispatch(showModal('ADD_POST_MODAL'))
    }

    handleOrder = (option) => {
        this.setState({
            orderBy: option.target.value
        })
    }

    render() {
        const { posts } = this.props

        var filteredPosts = posts;

        // Ordering by Lowest to Highest Score
        if (this.state.orderBy === 'date') {
            filteredPosts = posts.sort(function (a, b) { return b.timestamp - a.timestamp; })
        } else {
            filteredPosts = posts.sort(function (a, b) { return b.voteScore - a.voteScore; })
        }

        return (
            <div>
                <div className="flex space-between">
                    <div>
                        <button onClick={this.openModal}>Add a new post</button>
                    </div>

                    <div className="flex">
                        <div className="margin-right">Order by </div>
                        <div>
                            <select onChange={this.handleOrder} className="order-selector" name="orderBy" placeholder="order by">
                                <option value="vote">vote</option>
                                <option value="date">date</option>
                            </select>
                        </div>
                    </div>
                </div>

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
