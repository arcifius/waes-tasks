import React from 'react';
import PropTypes from 'prop-types';

const TaskListsItem = (props) => {
    return (
        <li>
            <p>Name: {props.title}</p>
            <p>Tasks: {props.tasks.length}</p>
        </li>
    );
};

TaskListsItem.propTypes = {
    title: PropTypes.string.isRequired,
    tasks: PropTypes.object.isRequired,
};

export default TaskListsItem;
