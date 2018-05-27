import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'mobx-react';
import taskListsStore from 'stores/taskLists';
import TaskLists from 'components/composition/taskLists';
import TaskListsViewer from 'components/composition/taskListsViewer';
import AppBar from 'components/composition/appBar';
import style from 'styles/taskManager';

export default class TaskManager extends Component {
    static propTypes = {
        google: PropTypes.object.isRequired,
    }

    componentWillMount() {
        this._fetchLists();
    }

    /**
     * Fetch task lists and its tasks from google
     */
    _fetchLists = () => {
        this.props.google.apis.tasks.tasklists.list()
            .then(async (response) => {
                taskListsStore.update(response.result.items);
            });
    }

    render() {
        return (
            <Provider taskLists={taskListsStore} google={this.props.google}>
                <div className="taskManager">
                    <AppBar />
                    <div className="flex-row">
                        <TaskLists title="Task lists" />
                        <TaskListsViewer />
                    </div>
                    <style global jsx>{style}</style>
                </div>
            </Provider>
        );
    }
}
