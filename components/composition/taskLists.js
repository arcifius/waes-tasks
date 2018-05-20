import React from 'react';
import PropTypes from 'prop-types';
import style from 'styles/taskLists';
import { inject, observer } from "mobx-react";
import TaskListsItem from 'components/composition/lists/taskListsItem';

const TaskLists = observer((props) => {
    const renderItens = () => {
        return props.taskLists.items.map((list) => {
            return (
                <TaskListsItem key={list.id} {...list} />
            );
        });
    };

    return (
        <div className={`taskLists`}>
            {props.title &&
                <h1>{props.title}</h1>
            }

            <ul>
                {renderItens()}
            </ul>
            <style jsx>{style}</style>
        </div>
    );
});

TaskLists.propTypes = {
    title: PropTypes.string,
    taskLists: PropTypes.object.isRequired,
    google: PropTypes.object.isRequired,
};

TaskLists.defaultProps = {
    title: undefined,
};

export default inject(`google`)(inject(`taskLists`)(TaskLists));
