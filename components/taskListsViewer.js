import React from 'react';
import PropTypes from 'prop-types';
import style from 'styles/taskListsViewer';

const TaskListsViewer = () => {
    const renderLists = () => {
        return [];
    };

    return (
        <div className={`taskListsViewer`}>
            {renderLists()}
            <style jsx>{style}</style>
        </div>
    );
};

TaskListsViewer.propTypes = {
    lists: PropTypes.array,
};

TaskListsViewer.defaultProps = {
    lists: [],
};

export default TaskListsViewer;
