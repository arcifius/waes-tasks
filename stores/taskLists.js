import { types } from 'mobx-state-tree';
import google from 'utils/google';
import TaskList from 'models/TaskList';

const TaskLists = types
    .model({
        items: types.optional(types.array(TaskList), []),
    })
    .actions(self => ({
        /**
         * Initial update contains all user task lists
         *
         * @param Array lists
         */
        update(lists) {
            // Dont keep old ones when updating
            self.items = [];

            // Format data to fit model
            lists.forEach((list) => {
                google.apis.tasks.tasks.list({ tasklist: list.id })
                    .then((response) => {
                        self.push(list, response.result.items);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
        },

        /**
         * pushes list to store
         *
         * @param TaskList list
         * @param Array tasks
         */
        push(list, tasks = []) {
            const subTasks = tasks.filter((task) => { return task.parent; });
            const topTasks = tasks.filter((task) => { return !task.parent; });

            self.format(list);
            list.tasks = [];

            topTasks.forEach((task) => {
                self.format(task);
                self.discoverSubTasks(task, subTasks);
                list.tasks.push(task);
            });

            self.items.push(list);
        },

        /**
         * Format string values to Date
         */
        format(target) {
            target.updated = new Date(target.updated);
            if (target.due) {
                target.due = new Date(target.due);
            }
            if (target.completedAt) {
                target.completedAt = new Date(target.completedAt);
            }
        },

        /**
         * Discovers all subtasks
         */
        discoverSubTasks(task, subTasks) {
            subTasks.forEach((subTask) => {
                if (subTask.parent === task.id) {
                    self.format(subTask);

                    if (task.subTasks) {
                        task.subTasks.push(subTask);
                    } else {
                        task.subTasks = [subTask];
                    }
                    self.discoverSubTasks(subTask, subTasks);
                }
            });
        },

        /**
         * Pushes a new list to store
         *
         * @param object list must match TaskList model structure
         */
        add(list) {
            list.updated = new Date(list.updated);
            self.items.push(list);
        },

        /**
         * Removes a list from store
         *
         * @param object list only needs to contain an "id" attribute
         */
        remove(list) {
            let targetIndex = -1;

            const target = self.items.filter((item, index) => {
                if (item.id === list.id) {
                    targetIndex = index;
                }
                return item.id === list.id;
            });

            if (target.length === 1) {
                self.items.splice(targetIndex, 1);
            }
        },

        /**
         * Activate a list
         * Currently we can active only one per time
         */
        activateList(listID) {
            self.items.forEach((item) => {
                if (item.id === listID) {
                    item.active = true;
                } else {
                    item.active = false;
                }
            });
        },
    }));

export default TaskLists.create({ items: [] });
