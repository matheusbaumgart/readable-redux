import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Posts from '../components/Posts.js'

class CategoryPage extends Component {

    render() {
        const { posts } = this.props
        const category = this.props.match.params.category;

        const postByCategory = posts.items.filter(function (obj) {
            return obj['category'] === category.toString();
        });

        return (
            <div>
                <span>Showing all posts from</span>
                <h2 className="no-margin-top">{category}</h2>
                <Posts posts={postByCategory} />
            </div>
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
