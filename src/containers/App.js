import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { Link } from 'react-router-dom'

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
    const { posts, categories } = this.props

    return (
      <Router>
        <div>
          <Link className="header-link" to='/'>
            <div className="header">Home</div>
          </Link>

          <div className="container">
            <Route exact path="/" render={() => (
              <div>
                <h2>Categories</h2>
                <Categories categories={categories.items} />

                <hr />

                <h2>Posts</h2>
                <Posts posts={posts.items} />
              </div>
            )} />

            <Route exact path="/:category" component={CategoryPage} />
            <Route exact path="/:category/:post_id" component={PostPage} />
          </div>
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
