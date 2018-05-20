import React from 'react';
import PropTypes from 'prop-types';

const TaskListsViewerItem = (props) => {
    return (
        <li>
            <h1>Name: {props.list.name}</h1>
            <button>clear completed</button>
            <button>new task</button>
            <div>
                list contains {props.list.tasks.length} tasks.
            </div>
        </li>
    );
};

TaskListsViewerItem.propTypes = {
    list: PropTypes.object.isRequired,
};

export default TaskListsViewerItem;
