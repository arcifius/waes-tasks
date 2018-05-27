import React from 'react';
import PropTypes from 'prop-types';
import style from 'styles/taskListsViewer';
import { inject, observer } from "mobx-react";
import TaskListsViewerItem from 'components/composition/lists/taskListsViewerItem';

const TaskListsViewer = observer((props) => {
    const renderLists = () => {
        return props.taskLists.items.map((list) => {
            if (list.active) {
                return (
                    <TaskListsViewerItem key={list.id} list={list} />
                );
            }
        });
    };

    return (
        <ul className={`taskListsViewer`}>
            {renderLists()}
            <style jsx>{style}</style>
        </ul>
    );
});

TaskListsViewer.propTypes = {
    taskLists: PropTypes.object.isRequired,
    google: PropTypes.object.isRequired,
};

export default inject(`google`)(inject(`taskLists`)(TaskListsViewer));
