import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from 'styles/taskItem';
import google from 'utils/google';
import Modal from 'react-modal';
import TaskDetailsForm from 'components/composition/forms/taskDetailsForm';
import { observer } from 'mobx-react';

class TaskItem extends Component {
    static propTypes = {
        active: PropTypes.bool.isRequired,
        depth: PropTypes.number.isRequired,
        list: PropTypes.object.isRequired,
        task: PropTypes.object.isRequired,
        onSelect: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            modal: {
                open: false,
            },
        };
    }

    componentDidMount() {
        // Allowing screen readers
        Modal.setAppElement(`#__next`);
    }

    /**
    * Closes task details modal
    * Triggered by esc, button click or overlay click
    */
    _closeTaskDetailModal = () => {
        this.setState({
            modal: {
                open: false,
            },
        });
    }

    /**
     * Removes this task
     */
    _handleRemove = (ev) => {
        ev.stopPropagation();

        google.apis.tasks.tasks.delete({ tasklist: this.props.list.id, task: this.props.task.id })
            .then(() => {
                this.props.list.removeTask(this.props.task);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * Show task details modal
     */
    _handleEdit = (ev) => {
        ev.stopPropagation();
        this.setState({
            modal: {
                open: true,
            },
        });
    }

    /**
     * Updates task status
     */
    _changeTaskStatus = (ev) => {
        ev.stopPropagation();

        const googleTaskDetails = Object.assign({}, this.props.task.toJSON());
        googleTaskDetails.updated = (new Date(googleTaskDetails.updated)).toISOString();
        if (googleTaskDetails.completedAt) {
            googleTaskDetails.completedAt = (new Date(googleTaskDetails.completedAt)).toISOString();
        }
        if (googleTaskDetails.due && googleTaskDetails.due !== 0) {
            googleTaskDetails.due = (new Date(googleTaskDetails.due)).toISOString();
        } else {
            delete googleTaskDetails.due;
        }

        googleTaskDetails.status = ev.target.checked ? `completed` : `needsAction`;

        google.apis.tasks.tasks.update({ tasklist: this.props.list.id, task: this.props.task.id }, googleTaskDetails)
            .then(() => {
                this.props.task.update(googleTaskDetails);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    _handleUpdateTaskDetails = (details) => {
        this.setState({
            modal: {
                open: false,
            },
        });

        const googleTaskDetails = Object.assign({}, this.props.task.toJSON());
        googleTaskDetails.title = details.title !== `` ? details.title : this.props.task.title;
        googleTaskDetails.due = details.due ? details.due : null;
        googleTaskDetails.notes = details.notes ? details.notes : ``;
        googleTaskDetails.status = details.status ? `completed` : `needsAction`;
        googleTaskDetails.updated = (new Date(googleTaskDetails.updated)).toISOString();
        if (googleTaskDetails.completedAt) {
            googleTaskDetails.completedAt = (new Date(googleTaskDetails.completedAt)).toISOString();
        }

        google.apis.tasks.tasks.update({ tasklist: this.props.list.id, task: this.props.task.id }, googleTaskDetails)
            .then(() => {
                this.props.task.update(googleTaskDetails);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        console.log(this.props.task.due);

        return (
            <li
                className={`task-item ${this.props.active ? `active` : ``}`}
                onClick={this.props.onSelect}
                style={{ marginLeft: this.props.depth * 30 }}
            >
                <Modal
                    className="appModal noselect"
                    overlayClassName="appOverlay"
                    ariaHideApp={false}
                    isOpen={this.state.modal.open}
                    onRequestClose={this._closeTaskDetailModal}
                    contentLabel="Edit task details modal"
                >
                    <header>
                        <h1>Task {this.props.task.title}</h1>
                        <button className="close" onClick={this._closeTaskDetailModal}>
                            <i className="fas fa-times" />
                        </button>
                    </header>
                    <section>
                        <TaskDetailsForm
                            task={this.props.task.toJSON()}
                            onSubmit={this._handleUpdateTaskDetails}
                            submitText="update"
                        />
                    </section>
                </Modal>

                <div className="actions">
                    <button onClick={this._handleRemove} className="remove-task">
                        <i className="far fa-trash-alt" />
                    </button>

                    <button onClick={this._handleEdit} className="renameList">
                        <i className="far fa-edit" />
                    </button>
                </div>

                <input
                    name="status"
                    type="checkbox"
                    checked={this.props.task.status === `completed`}
                    onChange={this._changeTaskStatus}
                    onClick={ev => ev.stopPropagation()}
                />
                <p>{this.props.task.title}</p>
                {(this.props.task.due && this.props.task.due > 0) &&
                    <span>{`Due date ${this.props.task.due.toDateString()}`}</span>
                }

                <style global jsx>{style}</style>
            </li>
        );
    }
}

export default observer(TaskItem);
