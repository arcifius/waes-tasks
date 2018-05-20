/*
* Task list model
* Contains the structure of a task list.
*/

import { types } from 'mobx-state-tree';
import Task from 'models/Task';

const TaskList = types.model({
    id: types.string,
    kind: types.string,
    selfLink: types.string,
    title: types.string,
    updated: types.Date,
    tasks: types.optional(types.array(Task), []),
});

export default TaskList;
