import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories } from '../actions'
import Posts from '../components/Posts.js'

class App extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPosts())
    dispatch(fetchCategories())
  }

  render() {
    const { posts, categories } = this.props
    const isEmpty = posts.length === 0
    console.log('====================================');
    console.log(this.props);
    console.log('====================================');
    return (
      <div>
        <h1>Posts</h1>
        <Posts posts={posts.items} />
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

export default connect(mapStateToProps)(App)
