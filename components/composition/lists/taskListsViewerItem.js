import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import TaskItem from 'components/composition/lists/taskItem';
import google from 'utils/google';
import style from 'styles/taskListsViewerItem';
import Modal from 'react-modal';
import TaskDetailsForm from 'components/composition/forms/taskDetailsForm';

/**
 * Renders a list and its tasks
 */
class TaskListsViewerItem extends Component {
    static propTypes = {
        list: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.depth = 0;

        this.state = {
            active: {},
            modal: {
                open: false,
            },
        };
    }

    componentWillUpdate() {
        this.depth = 0;
    }

    /**
     * Ask google to clear completed tasks on this list
     */
    _handleClearCompleted = () => {
        google.apis.tasks.tasks.clear({ tasklist: this.props.list.id })
            .then(() => {
                console.log(`cleared`);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * Ask google to create a new task
     */
    _handleNewTask = (newTask) => {
        this._closeTaskDetailModal();

        newTask.status = newTask.status ? `completed` : `needsAction`;

        google.apis.tasks.tasks.insert({ tasklist: this.props.list.id }, newTask)
            .then((response) => {
                if (response.result.due) {
                    response.result.due = new Date(response.result.due);
                }
                if (response.result.completedAt) {
                    response.result.completedAt = new Date(response.result.completedAt);
                }
                response.result.updated = new Date(response.result.updated);
                this.props.list.addTask(response.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * Sets a task as active
     */
    _handleActiveTask = (task) => {
        return () => {
            this.setState({ active: task });
        };
    }

    /**
     * Moves active task up
     */
    _handleMoveUp = () => {
        const target = this._seekTask(this.state.active.id);
        const moveRequest = {};
        let canMove = false;

        if (target.index > 0) {
            canMove = true;
            if (target.index >= 2) {
                moveRequest.previous = target.list[target.index - 2].id;
                moveRequest.parent = target.task.parent;
            } else if (target.index === 1) {
                if (target.task.parent) {
                    moveRequest.parent = target.task.parent;
                }
            }
        } else if (target.task.parent) {
            canMove = true;
            const parent = this._seekTask(target.task.parent);
            moveRequest.parent = parent.task.parent;
        }

        if (canMove) {
            google.apis.tasks.tasks.move({ tasklist: this.props.list.id, task: this.state.active.id, ...moveRequest })
                .then((response) => {
                    this.props.list.updateTaskPosition(this.state.active.id, response.result);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    /**
     * Moves active task down
     */
    _handleMoveDown = () => {
        const target = this._seekTask(this.state.active.id);
        const moveRequest = {};

        if (target) {
            if (target.index < target.list.length - 1) {
                moveRequest.previous = target.list[target.index + 1].id;
                if (target.task.parent) {
                    moveRequest.parent = target.task.parent;
                }

                google.apis.tasks.tasks.move({ tasklist: this.props.list.id, task: this.state.active.id, ...moveRequest })
                    .then((response) => {
                        this.props.list.updateTaskPosition(this.state.active.id, response.result);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else if (target.index === target.list.length - 1) {
                if (target.task.parent) {
                    this._handlePromoteTask();
                }
            }
        }
    }

    /**
     * Turns a task into a subtask of the above one
     */
    _handleTurnToSubTask = () => {
        const target = this._seekTask(this.state.active.id);
        const moveRequest = {};

        // If the active task is at index 0 we cant turn it on a subtask
        if (target && target.index > 0) {
            moveRequest.parent = target.list[target.index - 1].id;

            google.apis.tasks.tasks.move({ tasklist: this.props.list.id, task: this.state.active.id, ...moveRequest })
                .then((response) => {
                    this.props.list.updateTaskPosition(this.state.active.id, response.result);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    /**
     * Promotes a task to a higher level
     */
    _handlePromoteTask = () => {
        const target = this._seekTask(this.state.active.id);
        const moveRequest = {};

        // If the active task is at index 0 we cant turn it on a subtask
        if (target && target.task.parent) {
            const parent = this._seekTask(target.task.parent);
            if (parent.task.parent) {
                moveRequest.parent = parent.task.parent;
            }

            google.apis.tasks.tasks.move({ tasklist: this.props.list.id, task: this.state.active.id, ...moveRequest })
                .then((response) => {
                    this.props.list.updateTaskPosition(this.state.active.id, response.result);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    /**
     * Seeks a task inside a list
     * Returns the tasklist and task model
     */
    _seekTask = (taskID, list = this.props.list.tasks) => {
        let result;
        for (let i = 0; i < list.length; i += 1) {
            if (list[i].id === taskID) {
                result = { list, task: list[i], index: i };
                break;
            } else if (list[i].subTasks.length > 0 && !result) {
                result = this._seekTask(taskID, list[i].subTasks);
            }
        }
        return result;
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
     * Opens task details modal
     * Triggered by button click
     */
    _openTaskDetailModal = () => {
        this.setState({
            modal: {
                open: true,
            },
        });
    }

    renderTasks = (tasks = this.props.list.tasks, currentDepth = 0) => {
        return tasks.map((task) => {
            if (!task.deleted) {
                if (!task.parent) {
                    this.depth = 0;
                }
                let subtasks = [];

                if (task.subTasks.length > 0) {
                    this.depth += 1;
                    subtasks = this.renderTasks(task.subTasks, this.depth);
                }

                return [
                    <TaskItem
                        key={task.id}
                        depth={currentDepth}
                        active={this.state.active.id === task.id}
                        list={this.props.list}
                        task={task}
                        onSelect={this._handleActiveTask(task)}
                    />,
                    <div className="subtasks" key={`subtasksof${task.id}`}>
                        {subtasks}
                    </div>,
                ];
            }
        });
    }

    render() {
        return (
            <li className="task-list-viewer-item">
                <Modal
                    className="appModal noselect"
                    overlayClassName="appOverlay"
                    ariaHideApp={false}
                    isOpen={this.state.modal.open}
                    onRequestClose={this._closeTaskDetailModal}
                    contentLabel="Edit task details modal"
                >
                    <header>
                        <h1>New Task</h1>
                        <button className="close" onClick={this._closeTaskDetailModal}>
                            <i className="fas fa-times" />
                        </button>
                    </header>
                    <section>
                        <TaskDetailsForm onSubmit={this._handleNewTask} submitText="create" />
                    </section>
                </Modal>

                <h1>{this.props.list.title}</h1>
                <div className="fixed-actions-bar">
                    <button className="clear-completed" onClick={this._handleClearCompleted}>
                        <i className="fas fa-check" /> clear completed
                    </button>
                    <button className="new-task" onClick={this._openTaskDetailModal}>
                        <i className="fas fa-plus" /> new task
                    </button>
                </div>

                {Object.keys(this.state.active).length > 0 &&
                    <div className="situational-actions-bar">
                        <span>Task {this.state.active.title}</span>
                        <div className="buttons">
                            <button onClick={this._handleMoveUp}>
                                <i className="fas fa-arrow-up" /> move up
                            </button>
                            <button onClick={this._handleMoveDown}>
                                <i className="fas fa-arrow-down" /> move down
                            </button>
                        </div>

                        <div className="buttons">
                            <button onClick={this._handleTurnToSubTask}>
                                <i className="fas fa-star-half" /> turn into a subtask
                            </button>
                            <button onClick={this._handlePromoteTask}>
                                <i className="fas fa-star" /> promote task to higher level
                            </button>
                        </div>
                    </div>
                }

                <div className="list-wrapper">
                    <ul>
                        {this.renderTasks()}
                    </ul>
                </div>

                <style global jsx>{style}</style>
            </li>
        );
    }
}

export default observer(TaskListsViewerItem);
