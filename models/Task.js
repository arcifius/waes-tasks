/*
* Task model
* Contains the structure of a task.
*/

import { types } from 'mobx-state-tree';

const Task = types.model({
    kind: types.string,
    id: types.string,
    etag: types.string,
    title: types.string,
    updated: types.Date,
    selfLink: types.string,
    parent: types.maybe(types.string),
    position: types.string,
    notes: types.maybe(types.string),
    status: types.union(types.literal(`needsAction`), types.literal(`completed`)),
    due: types.maybe(types.Date),
    completedAt: types.maybe(types.Date),
    deleted: types.optional(types.boolean, false),
    hidden: types.optional(types.boolean, false),
    subTasks: types.maybe(types.array(types.late(() => Task))),
});

export default Task;
