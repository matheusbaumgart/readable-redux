import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// import { fetchPosts } from '../actions'

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import Posts from '../components/Posts.js'

class CategoryPage extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch, posts } = this.props
        const category = this.props.match.params.category;
    }

    render() {
        const { posts } = this.props
        const category = this.props.match.params.category;

        const postByCategory = posts.items.filter(function (obj) {
            return obj['category'] == category.toString();
        });

        return (
            <Posts posts={postByCategory} />
        )
    }
}

const mapStateToProps = state => {
    const { posts } = state

    return {
        posts
    }
}

export default connect(mapStateToProps)(CategoryPage)
