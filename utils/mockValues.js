import TaskList from 'models/TaskList';
import Task from 'models/Task';

export default {
    createList: () => {
        return TaskList.create({
            id: (Math.floor(Math.random() * 100) + 1).toString(),
            kind: ``,
            selfLink: ``,
            title: ``,
            updated: new Date(),
            tasks: [
                Task.create({
                    kind: ``,
                    id: (Math.floor(Math.random() * 100) + 1).toString(),
                    etag: ``,
                    title: ``,
                    updated: new Date(),
                    selfLink: ``,
                    position: ``,
                    status: `needsAction`,
                }),
            ],
        });
    },
};
