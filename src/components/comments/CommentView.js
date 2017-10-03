import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submitEditComment, submitDeleteComment } from '../../actions'
import CommentAdd from './CommentAdd'

import Moment from 'react-moment';
import 'moment-timezone';

class CommentView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            deleteMode: false
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

    render() {
        const { comment } = this.props

        return (
            <li>
                <div className="flex space-between">
                    <div className="comment-title"><strong>{comment.author}</strong> - <Moment fromNow>{comment.timestamp}</Moment></div>
                    <div className="comment-actions">
                        {this.state.editMode ?
                            <button className="button-text margin-right--sm" onClick={() => this.editCommentCancel(comment.id)}>Cancel</button>
                            : <button className="button-text margin-right--sm" onClick={() => this.editComment(comment.id)}>Edit</button>
                        }
                        {this.state.editMode ?
                            <button className="button-text" onClick={() => this.editCommentSave(comment.id)}>Save</button>
                            : <button className="button-text" onClick={() => this.deleteComment(comment.id)}>Delete</button>
                        }
                    </div>
                </div>

                {this.state.editMode ?
                    <div className="comment-body--editing">
                        <textarea defaultValue={comment.body} />
                    </div>
                    : <div>{comment.body}</div>
                }
            </li>
        );
    }
}

const mapStateToProps = () => {
    return {}
}

export default connect(mapStateToProps)(CommentView)
