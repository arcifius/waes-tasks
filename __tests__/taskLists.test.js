/* eslint-env jest */

import { mount } from 'enzyme';
import React from 'react';

// Components involved in this test
import TaskLists from 'components/taskLists';
import TaskListsItem from 'components/composition/taskListsItem';

// Models involved in this test
import TaskList from 'models/TaskList';
import Task from 'models/Task';

describe(`TaskLists`, () => {
    let mountedTaskLists;
    let props;

    // This helper will assist in component mounting
    const taskLists = () => {
        if (!mountedTaskLists) {
            mountedTaskLists = mount(<TaskLists {...props} />);
        }
        return mountedTaskLists;
    };

    // We will have a fresh mount on every test
    beforeEach(() => {
        props = {
            title: undefined,
            lists: [],
        };
        mountedTaskLists = undefined;
    });

    it(`always renders a div`, () => {
        const divs = taskLists().find(`div`);
        expect(divs.length).toBeGreaterThan(0);
    });

    describe(`when "title" is defined`, () => {
        beforeEach(() => {
            props = {
                title: `Task Lists`,
                lists: [],
            };
        });

        it(`renders a h1`, () => {
            expect(taskLists().find(`h1`).length).toBe(1);
        });
    });

    describe(`when "title" is undefined`, () => {
        beforeEach(() => {
            props = {
                title: undefined,
                lists: [],
            };
        });

        it(`does not render a h1`, () => {
            expect(taskLists().find(`h1`).length).toBe(0);
        });
    });

    it(`always contains an ul`, () => {
        const wrapper = taskLists().find(`div`).first();
        expect(wrapper.find(`ul`).length).toBe(1);
    });

    describe(`if "lists" contains any element`, () => {
        beforeEach(() => {
            props = {
                title: undefined,
                lists: [
                    TaskList.create({ name: `list one`, tasks: [Task.create({ title: `task inside list one` })] }),
                    TaskList.create({ name: `list two`, tasks: [Task.create({ title: `task inside list two` })] }),
                ],
            };
        });

        it(`renders an "Item" for each element`, () => {
            const ul = taskLists().find(`ul`).first();
            expect(ul.find(TaskListsItem).length).toBe(props.lists.length);
        });

        it(`passes element's information to "Item" as props`, () => {
            const ul = taskLists().find(`ul`).first();
            ul.find(TaskListsItem).forEach((item) => {
                expect(Object.keys(item.props()).length).toBe(Object.keys(TaskList.create().toJSON()).length);
            });
        });
    });
});
