import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import taskLists from 'stores/taskLists';
import google from 'utils/google';
import style from 'styles/taskListsItem';

class TaskListsItem extends Component {
    static propTypes = {
        list: PropTypes.object.isRequired,
        onRemove: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            title: this.props.list.title,
        };
    }

    /**
     * Switch to edit mode
     */
    _handleEdit = (ev) => {
        ev.stopPropagation();

        this.setState({ editing: true });

        setImmediate(() => {
            this.renameInput.focus();
        });
    }

    /**
     * Update title with input's value
     */
    _handleTitleChange = (ev) => {
        this.setState({ title: ev.target.value });
    }

    /**
     * Update model with the new title
     */
    _handleUpdate = () => {
        if (this.state.title !== this.props.list.title) {
            const updatedList = Object.assign({}, this.props.list.toJSON());
            // Formatting date for Google
            updatedList.updated = (new Date(updatedList.updated)).toISOString();
            updatedList.title = this.state.title;

            // Dont need to send all tasks
            updatedList.tasks = [];

            // Ask google to update it
            google.apis.tasks.tasklists.update({ tasklist: this.props.list.id }, updatedList)
                .then(() => {
                    this.setState({ editing: false });
                    this.props.list.update({ title: this.state.title });
                }).catch(() => {
                    this.setState({ editing: false });
                });
        } else {
            this.setState({ editing: false });
        }
    }

    /**
     * Sends list for viewer
     */
    _handleActiveList = () => {
        taskLists.activateList(this.props.list.id);
    }

    /**
     * We wont pass the event to component's parents
     * Just call the provided callback
     */
    _handleRemove = (ev) => {
        ev.stopPropagation();
        this.props.onRemove();
    }

    render() {
        return (
            <li onClick={this._handleActiveList} className={this.props.list.active ? `task-list active` : `task-list`}>
                <p className="task-counter">{this.props.list.tasks.length} tasks</p>

                <div className="flex-row item-wrapper">
                    {!this.state.editing ?
                        <span className="listTitle">
                            {this.props.list.title}
                        </span>
                        :
                        <input
                            ref={(c) => { this.renameInput = c; }}
                            type="text"
                            value={this.state.title}
                            onChange={this._handleTitleChange}
                            onBlur={this._handleUpdate}
                        />
                    }

                    <div className="actions">
                        <button onClick={this._handleRemove} className="removeList">
                            <i className="far fa-trash-alt" />
                        </button>

                        <button onClick={this._handleEdit} className="renameList">
                            <i className="far fa-edit" />
                        </button>
                    </div>
                </div>
                <style jsx global>{style}</style>
            </li>
        );
    }
}

export default observer(TaskListsItem);
