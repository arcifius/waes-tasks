import React from 'react';
import PropTypes from 'prop-types';
import TaskManager from 'components/taskManager';
import withGoogle from 'components/hoc/withGoogle';

const Index = (props) => {
    return (
        <TaskManager google={props.google} />
    );
};

Index.propTypes = {
    google: PropTypes.object.isRequired,
};

export default withGoogle(Index);
