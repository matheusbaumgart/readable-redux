import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submitAddComment } from '../../actions'
const uuidv1 = require('uuid/v1');

class CommentAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commentBody: '',
            commentAuthor: ''
        };
    }

    updateCommentBody = e => {
        this.setState({ commentBody: e.target.value })
    }

    updateCommentAuthor = e => {
        this.setState({ commentAuthor: e.target.value })
    }

    addComment = () => {
        let comment = {
            id: uuidv1(),
            timestamp: Date.now(),
            body: this.state.commentBody,
            author: this.state.commentAuthor ? this.state.commentAuthor : 'Anonymous',
            parentId: this.props.postID,
            voteScore: 1
        }
        const { dispatch } = this.props
        dispatch(submitAddComment(comment))

        this.setState({ commentBody: '', commentAuthor: ''})
    }

    render() {
        const { comment } = this.props

        return (
            <div className="add-comment">
                <h4>Add a comment</h4>

                <input type="text" className="margin-bottom--sm" placeholder="Your name (optional)" value={this.state.commentAuthor} onChange={this.updateCommentAuthor} />
                <textarea placeholder="Add your comment" value={this.state.commentBody} onChange={this.updateCommentBody}></textarea>

                <button className="margin-top" onClick={this.addComment}>Add a comment</button>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {}
}

export default connect(mapStateToProps)(CommentAdd)
