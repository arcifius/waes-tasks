import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import taskListsStore from 'stores/taskLists';
import TaskLists from 'components/taskLists';
import TaskListsViewer from 'components/taskListsViewer';
import AppBar from 'components/appBar';
import withGoogle from 'components/hoc/withGoogle';
import google from 'utils/google';
import style from 'styles/taskManager';

class TaskManager extends Component {
    componentWillMount() {
        this._fetchLists();
    }

    /**
     * Fetch task lists and its tasks from google
     */
    _fetchLists = () => {
        google.apis.tasks.tasklists.list()
            .then(async (response) => {
                taskListsStore.update(response.result.items);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <Provider taskLists={taskListsStore}>
                <div className="taskManager">
                    <AppBar />
                    <TaskLists title="Task lists" />
                    <TaskListsViewer />
                    <style jsx>{style}</style>
                </div>
            </Provider>
        );
    }
}

export default withGoogle(TaskManager);
