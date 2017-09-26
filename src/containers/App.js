import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
// import Posts from '../components/Posts'

class App extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPosts())
  }

  componentWillReceiveProps(nextProps) {
      const { dispatch } = nextProps
      dispatch(fetchPosts())
  }

  render() {
    const { posts, isFetching } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
        <h1>Test</h1>
      </div>
    )
  }
}

const mapStateToProps = (state, posts) => {
  return {
    posts
  }
}

export default connect(mapStateToProps)(App)
