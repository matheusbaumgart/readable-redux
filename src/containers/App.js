import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories } from '../actions'
// import Posts from '../components/Posts'

class App extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPosts())
    dispatch(fetchCategories())
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = nextProps
    dispatch(fetchPosts())
    dispatch(fetchCategories())
  }

  render() {
    const { posts, categories } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
        <h1>Test</h1>
      </div>
    )
  }
}

const mapStateToProps = (state, posts, categories) => {
  return {
    posts,
    categories
  }
}

export default connect(mapStateToProps)(App)
