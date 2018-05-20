import React from 'react';
import PropTypes from 'prop-types';
import style from 'styles/taskListsViewer';
import { inject, observer } from "mobx-react";
import TaskListsViewerItem from 'components/composition/lists/taskListsViewerItem';

const TaskListsViewer = observer((props) => {
    const renderLists = () => {
        return props.taskLists.items.map((list) => {
            return (
                <TaskListsViewerItem key={list.id} list={list} />
            );
        });
    };

    return (
        <div className={`taskListsViewer`}>
            {renderLists()}
            <style jsx>{style}</style>
        </div>
    );
});

TaskListsViewer.propTypes = {
    taskLists: PropTypes.object.isRequired,
    google: PropTypes.object.isRequired,
};

export default inject(`google`)(inject(`taskLists`)(TaskListsViewer));
