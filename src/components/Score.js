import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Icon } from 'react-fa'
import { submitVote } from '../actions'

class Score extends Component {

    handleVoteDown = () => {
        const { dispatch, post } = this.props
        dispatch(submitVote(post.id, 'downVote'))
        if (this.props.update) {
            this.props.update();
        }
    }

    handleVoteUp = () => {
        const { dispatch, post } = this.props
        dispatch(submitVote(post.id, 'upVote'))
        if (this.props.update) {
            this.props.update();
        }
    }

    render() {
        const { post } = this.props

        return (
            <div>
                <div className="vote-score">{post.voteScore}</div>
                &nbsp;<Icon data-id={post.id} onClick={this.handleVoteDown} className="vote-icon down" name="caret-down" />
                &nbsp;<Icon data-id={post.id} onClick={this.handleVoteUp} className="vote-icon up" name="caret-up" />
            </div>
        )
    }

}

function mapStateToProps(state) {
    const posts = this.state
    return (
        {
            posts
        }
    )
}
export default connect(mapStateToProps)(Score)