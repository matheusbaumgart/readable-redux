import React, { Component } from 'react'
import Moment from 'react-moment';
import 'moment-timezone';
import CommentView from './CommentView'

class CommentsList extends Component {
    render() {
        const { comments } = this.props
        comments.sort(function (a, b) { return b.voteScore - a.voteScore; })

        return (
            <div>
                <h4>All comments ({this.props.comments.length})</h4>
                <ul className="comments-list">
                    {this.props.comments.map((comment, i) =>
                        <CommentView key={i} comment={comment} />
                    )}
                </ul>
            </div>
        );
    }
}

export default CommentsList
