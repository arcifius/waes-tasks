import { types } from 'mobx-state-tree';
import google from 'utils/google';
import TaskList from 'models/TaskList';

const TaskLists = types
    .model({
        items: types.optional(types.array(TaskList), []),
    })
    .actions(self => ({
        update(lists) {
            // Dont keep old ones when updating
            self.items = [];

            // Format data to fit model
            lists.forEach((list) => {
                google.apis.tasks.tasks.list({ tasklist: list.id })
                    .then((response) => {
                        self.formatAndPush(list, response.result.items);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
        },

        formatAndPush(list, tasks) {
            list.updated = new Date(list.updated);
            list.tasks = tasks;
            list.tasks.forEach((task) => {
                task.updated = new Date(task.updated);
                if (task.due) {
                    task.due = new Date(task.due);
                }
                if (task.completedAt) {
                    task.completedAt = new Date(task.completedAt);
                }
            });
            self.items.push(list);
        },
    }));

export default TaskLists.create({ items: [] });
