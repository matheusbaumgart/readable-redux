import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { fetchPosts, fetchCategories } from '../actions'

import Posts from '../components/Posts.js'
import Categories from '../components/Categories.js'

import CategoryPage from '../containers/CategoryPage.js'
import PostPage from '../containers/PostPage.js'

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPosts())
    dispatch(fetchCategories())
  }

  render() {
    const { posts, categories, dispatch } = this.props

    return (
      <Router>
        <div>
          <Route exact path="/" render={() => (
            <div>
              <h1>Categories</h1>
              <Categories categories={categories.items} />

              <h1>Posts</h1>
              <Posts posts={posts.items} />
            </div>
          )} />

          <Route exact path="/:category" component={CategoryPage} />
          <Route exact path="/:category/:post_id" component={PostPage} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  const { posts, categories } = state

  return {
    posts,
    categories,
  }
}

export default connect(mapStateToProps)(App)
