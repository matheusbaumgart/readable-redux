import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Icon } from 'react-fa'
import { submitVoteComment } from '../../actions'

class CommentScore extends Component {

    handleVoteDown = () => {
        const { dispatch, comment } = this.props
        dispatch(submitVoteComment(comment.id, 'downVote'))
    }

    handleVoteUp = () => {
        const { dispatch, comment } = this.props
        dispatch(submitVoteComment(comment.id, 'upVote')) 
    }

    render() {
        const { comment } = this.props

        return (
            <div>
                <div className="vote-score">{comment.voteScore}</div>
                &nbsp;<Icon data-id={comment.id} onClick={this.handleVoteDown} className="vote-icon down" name="caret-down" />
                &nbsp;<Icon data-id={comment.id} onClick={this.handleVoteUp} className="vote-icon up" name="caret-up" />
            </div>
        )
    }

}

function mapStateToProps() {
    return ({})
}
export default connect(mapStateToProps)(CommentScore)