import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showModal, hideModal, submitPost } from '../actions'
import Modal from 'react-modal'
import { Field, reduxForm } from 'redux-form'

const modalStyles = {
    content: {
        width: '600px',
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#f1f1f1'
    }
}

const required = value => value ? undefined : 'Required'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className="input-group">
        <label>{label}</label>
        <div>
            <input className={touched && error && 'required-border'} {...input} placeholder={label} type={type} />
            {touched && ((error && <div className="required-msg">{error}</div>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)

const renderTextarea = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className="input-group">
        <label>{label}</label>
        <div>
            <textarea {...input} className={touched && error && 'required-border'} placeholder={label} type={type} />
            {touched && ((error && <div className="required-msg">{error}</div>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)

const renderSelect = ({ input, label, type, data, meta: { touched, error, warning } }) => (
    <div className="input-group">
        <label>{label}</label>
        <div>
            <select {...input} className={touched && error && 'required-border'} type={type}>
                <option value=""></option>

                {data.items.map((data) => (
                    <option value={data.name} key={data.name}>
                        {data.name}
                    </option>
                ))}
            </select>
            {touched && ((error && <div className="required-msg">{error}</div>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)

class AddEditPostModal extends Component {

    openModal = () => {
        const { dispatch } = this.props
        dispatch(showModal('SAVE_POST_MODAL'))
    }

    closeModal = () => {
        const { dispatch } = this.props
        dispatch(hideModal())
        this.props.reset();
    }

    sendFormData = (post) => {
        const { dispatch } = this.props
        dispatch(submitPost(post))
            .then(() => {
                this.closeModal();
            })
        // this.props.reset();
    }

    render() {
        const { modal, handleSubmit, pristine, submitting, categories } = this.props

        return (
            <div>
                <button onClick={this.openModal}>Add a new post</button>

                <Modal
                    isOpen={modal.modalProps.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={modalStyles}
                    contentLabel="Add post"
                >

                    <h2 className="no-margin-top">Add new post</h2>

                    <form onSubmit={handleSubmit(this.sendFormData)}>
                        <Field name="title" type="text"
                            component={renderField} label="Title"
                            validate={required}
                        />
                        <Field name="body" type="textarea"
                            component={renderTextarea} label="Content"
                            validate={required}
                        />
                        <Field name="author" type="text"
                            component={renderField} label="Author"
                            validate={required}
                        />

                        <Field name="category" type="text"
                            component={renderSelect} label="Category"
                            validate={required} data={categories}
                        />


                        <br />

                        <div className="align-right">
                            <button className="button-border margin-right" onClick={this.closeModal}>
                                Cancel
                            </button>
                            <button type="submit" disabled={pristine || submitting}>
                                Save Post
                            </button>
                        </div>
                    </form>

                </Modal>
            </div>

        );
    }
}


function mapStateToProps({ modal, post, categories }) {
    return (
        {
            modal,
            post,
            categories
        }
    )
}

AddEditPostModal = connect(
    mapStateToProps
)(AddEditPostModal);

export default reduxForm({
    form: 'savePostForm', // a unique name for this form
    required
})(AddEditPostModal);