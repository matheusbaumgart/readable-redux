import React, { Component } from 'react'
import Moment from 'react-moment';
import 'moment-timezone';
import CommentView from './CommentView'

class CommentEdit extends Component {
    render() {
        return (
            <div className="comment-body--editing">
                <textarea defaultValue={this.props.defaultValue} />
            </div>
        );
    }
}

export default CommentEdit
