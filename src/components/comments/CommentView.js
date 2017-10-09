import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submitEditComment, submitDeleteComment } from '../../actions'
import CommentAdd from './CommentAdd'
import CommentScore from './CommentScore'

import Moment from 'react-moment';
import 'moment-timezone';

class CommentView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            deleteMode: false,
            commentBody: this.props.comment.body
        };
    }

    editComment = () => {
        this.setState({ editMode: true });
    }

    editCommentCancel = () => {
        this.setState({ editMode: false })
    }

    editCommentSave = (commentID, commentBody) => {
        this.setState({ editMode: false })
        const { dispatch } = this.props
        dispatch(submitEditComment(commentID, commentBody))
    }

    deleteComment = (commentID) => {
        const { dispatch } = this.props
        dispatch(submitDeleteComment(commentID))
    }

    updateCommentBody = e => {
        this.setState({
            commentBody: e.target.value
        })
    }

    render() {
        const { comment } = this.props

        return (
            <li>
                <div className="flex space-between">
                    <div className="comment-title">
                        <strong>{comment.author}</strong> - <Moment fromNow>{comment.timestamp}</Moment>
                    </div>
                    <div className="comment-actions">
                        {this.state.editMode ?
                            <div>
                                <button style={{color: '#888'}} className="button-text margin-right--sm" onClick={() => this.editCommentCancel(comment.id)}>Cancel</button>
                                <button style={{color: 'green'}} className="button-text" onClick={() => this.editCommentSave(comment.id, this.state.commentBody)}><strong>Save</strong></button>
                            </div>
                            :
                            <div>
                                <button className="button-text margin-right--sm" onClick={() => this.editComment(comment.id)}>Edit</button>
                                <button className="button-text" onClick={() => this.deleteComment(comment.id)}>Delete</button>
                            </div>
                        }
                    </div>
                </div>

                {this.state.editMode ?
                    <div className="comment-body--editing">
                        <textarea onChange={this.updateCommentBody} value={this.state.commentBody} />
                    </div>
                    :
                    <div className="flex space-between">
                        <div>{comment.body}</div>
                        <CommentScore comment={comment} />
                    </div>
                }
            </li>
        );
    }
}

const mapStateToProps = () => {
    return {}
}

export default connect(mapStateToProps)(CommentView)
