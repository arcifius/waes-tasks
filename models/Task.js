/*
* Task model
* Contains the structure of a task.
*/

import { types } from 'mobx-state-tree';

const Task = types.model({
    kind: types.maybe(types.string),
    id: types.maybe(types.string),
    etag: types.maybe(types.string),
    title: types.string,
    updated: types.maybe(types.Date),
    selfLink: types.maybe(types.string),
    parent: types.maybe(types.string),
    position: types.maybe(types.string),
    notes: types.maybe(types.string),
    status: types.union(types.literal(`needsAction`), types.literal(`completed`)),
    due: types.maybe(types.Date),
    completedAt: types.maybe(types.Date),
    deleted: types.optional(types.boolean, false),
    hidden: types.optional(types.boolean, false),
    subTasks: types.optional(types.array(types.late(() => Task)), []),
})
    .actions(self => ({
        update(data) {
            self.title = data.title;
            self.due = new Date(data.due);
            self.notes = data.notes;
            self.status = data.status;
        },
        updatePosition(data) {
            self.id = data.id;
            self.updated = new Date(data.updated);
            self.position = data.position;
            self.parent = data.parent ? data.parent : null;
        },
        updateSubTaskList(task) {
            self.subTasks.push(task);
        },
        /**
         * When moviment occurs (move up/down, subtask/promote task)
         * this should be called to reorder items.
         */
        sort() {
            const tasks = self.subTasks.toJSON().slice(0);
            tasks.sort((a, b) => {
                const aPosition = parseInt(a.position, 10);
                const bPosition = parseInt(b.position, 10);
                return aPosition - bPosition;
            });
            self.subTasks = tasks;

            self.subTasks.forEach((task) => {
                if (task.subTasks.length > 0) {
                    task.sort();
                }
            });
        },
    }));

export default Task;
