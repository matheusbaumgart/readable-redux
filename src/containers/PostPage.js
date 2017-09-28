import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class PostPage extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    render() {
        return (
            <div>
                Post
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { posts, categories } = state

    return {
        posts,
        categories
    }
}

export default connect(mapStateToProps)(PostPage)
