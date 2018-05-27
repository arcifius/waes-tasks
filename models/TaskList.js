/*
* Task list model
* Contains the structure of a task list.
*/

import { types, detach } from 'mobx-state-tree';
import Task from 'models/Task';

const TaskList = types.model({
    active: types.optional(types.boolean, false),
    id: types.string,
    kind: types.string,
    selfLink: types.string,
    title: types.string,
    updated: types.Date,
    tasks: types.optional(types.array(Task), []),
})
    .actions(self => ({
        addTask(task) {
            self.tasks.push(task);
            self.sort();
        },
        update(data) {
            self.title = data.title ? data.title : self.title;
        },
        removeTask(task) {
            detach(task);
        },
        updateTaskPosition(taskID, data, tasklist = self.tasks) {
            let updated;

            tasklist.every((task) => {
                if (task.subTasks.length > 0) {
                    self.updateTaskPosition(taskID, data, task.subTasks);
                }

                if (task.id === taskID) {
                    task.updatePosition(data);
                    updated = Object.assign({}, task.toJSON());
                    detach(task);

                    return false;
                }
                return true;
            });

            if (updated) {
                // Reorder list to reflect position update
                self.updateSubtasks(self.tasks, updated);
                self.sort();
            }
        },
        updateSubtasks(target, updatedTask) {
            if (updatedTask.parent) {
                target.every((task) => {
                    if (updatedTask.parent === task.id) {
                        task.updateSubTaskList(updatedTask);
                        return false;
                    }

                    self.updateSubtasks(task.subTasks, updatedTask);
                    return true;
                });
            } else {
                self.tasks.push(updatedTask);
            }
        },
        sort() {
            const tasks = self.tasks.toJSON().slice(0);

            tasks.sort((a, b) => {
                const aPosition = parseInt(a.position, 10);
                const bPosition = parseInt(b.position, 10);
                return aPosition - bPosition;
            });

            self.tasks = tasks;

            self.tasks.forEach((task) => {
                if (task.subTasks) {
                    task.sort();
                }
            });
        },
    }));


export default TaskList;
